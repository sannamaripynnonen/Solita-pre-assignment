import { sql } from "../database/database.js";

const getAllEspooStations = async () => {
    return await sql`SELECT station_id, station_namefi FROM bikestations WHERE kaupunki = 'Espoo' ORDER BY station_namefi`;
};

const getAllHelsinkiStations = async () => {
    return await sql`SELECT station_id, station_namefi FROM bikestations WHERE kaupunki <> 'Espoo' ORDER BY station_namefi`;
};

const getStation = async (station) => {
    return await sql`SELECT station_id, station_namefi FROM bikestations WHERE station_namefi iLIKE '%' || ${station} || '%'`;
};

const getDetailsById = async (id, month) => {
    const rows = await sql`SELECT station_id, station_namefi, osoite FROM bikestations WHERE station_id = ${id}`;
    const details = rows[0];
    
    if (rows && rows.length > 0) {
        // trip counts
        const dept_trips = await sql`SELECT COUNT(*) FROM citybiketrips WHERE dept_station_id = ${id} AND dept_time LIKE ${month} || '%'`
        const return_trips = await sql`SELECT COUNT(*) FROM citybiketrips WHERE return_station_id = ${id} AND dept_time LIKE ${month} || '%'`
        
        details.dept_trips = dept_trips[0].count;
        details.return_trips = return_trips[0].count;
        
        // average distances
        if (month == '2021-') {
            const dept_distance = await sql`SELECT FLOOR(AVG(distance / 1000)) AS distance FROM citybiketrips WHERE dept_station_id = ${id}`
            const return_distance = await sql`SELECT FLOOR(AVG(distance / 1000)) AS distance FROM citybiketrips WHERE return_station_id = ${id}`
            details.dept_distance = dept_distance[0].distance;
            details.return_distance = return_distance[0].distance;
        } else {
            const dept_distance = await sql`SELECT dept_time, FLOOR(AVG(distance / 1000)) AS distance FROM citybiketrips WHERE dept_station_id = ${id} 
                                            AND dept_time LIKE ${month} || '%' GROUP BY dept_time`
            const return_distance = await sql`SELECT dept_time, FLOOR(AVG(distance / 1000)) AS distance FROM citybiketrips WHERE return_station_id = ${id}
                                            AND dept_time LIKE ${month} || '%' GROUP BY dept_time`
            details.dept_distance = dept_distance[0].distance;
            details.return_distance = return_distance[0].distance;
        } 

        // top stations
        const top_return = await sql`SELECT dept_station_id, return_station, COUNT(dept_time) AS trip_count FROM citybiketrips 
                                    WHERE dept_station_id = ${id} AND dept_time LIKE ${month} || '%' GROUP BY return_station, dept_station_id 
                                    ORDER BY trip_count DESC LIMIT 5`
        const top_dept = await sql`SELECT return_station_id, dept_station, COUNT(dept_time) AS trip_count FROM citybiketrips 
                                    WHERE return_station_id = ${id} AND dept_time LIKE ${month} || '%' GROUP BY dept_station, return_station_id 
                                    ORDER BY trip_count DESC LIMIT 5`
        details.top_return = top_return;
        details.top_dept = top_dept;
        return details;
    }
}

export { getAllEspooStations, getAllHelsinkiStations, getStation, getDetailsById }