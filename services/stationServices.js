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
        const details = rows[0];
        details.dept_trips = dept_trips[0].count;
        details.return_trips = return_trips[0].count;
        return details;
    }
}

export { getAllEspooStations, getAllHelsinkiStations, getDetailsById }