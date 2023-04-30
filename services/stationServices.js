import { sql } from "../database/database.js";

const getAllEspooStations = async () => {
    return await sql`SELECT station_id, station_namefi FROM bikestations WHERE kaupunki = 'Espoo' ORDER BY station_namefi`;
};

const getAllHelsinkiStations = async () => {
    return await sql`SELECT station_id, station_namefi FROM bikestations WHERE kaupunki <> 'Espoo' ORDER BY station_namefi`;
};

const getDetailsById = async (id) => {
    const rows = await sql`SELECT station_namefi, osoite FROM bikestations WHERE station_id = ${id}`;
    if (rows && rows.length > 0) {
        const dept_trips = await sql`SELECT COUNT(*) FROM citybiketrips WHERE dept_station_id = ${id}`
        const return_trips = await sql`SELECT COUNT(*) FROM citybiketrips WHERE return_station_id = ${id}`
        const dept_distance = await sql`SELECT FLOOR(AVG(distance / 1000)) AS distance FROM citybiketrips WHERE dept_station_id = ${id}`
        const return_distance = await sql`SELECT FLOOR(AVG(distance / 1000)) AS distance FROM citybiketrips WHERE return_station_id = ${id}`
        const top_return = await sql`SELECT dept_station_id, return_station, COUNT(return_station) AS trip_count FROM citybiketrips GROUP BY return_station, dept_station_id HAVING dept_station_id = ${id} ORDER BY trip_count DESC LIMIT 5`
        const top_dept = await sql`SELECT return_station_id, dept_station, COUNT(dept_station) AS trip_count FROM citybiketrips GROUP BY dept_station, return_station_id HAVING return_station_id = ${id} ORDER BY trip_count DESC LIMIT 5`
        const details = rows[0];
        details.dept_trips = dept_trips[0].count;
        details.return_trips = return_trips[0].count;
        details.dept_distance = dept_distance[0].distance;
        details.return_distance = return_distance[0].distance;
        details.top_return = top_return;
        details.top_dept = top_dept;
        return details;
    }
}

export { getAllEspooStations, getAllHelsinkiStations, getDetailsById }