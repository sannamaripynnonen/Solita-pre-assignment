import { sql } from "../database/database.js";

// TODO: Single station: name, address, num of journeys starting and ending at station
const getAllEspooStations = async () => {
    return await sql`SELECT station_namefi FROM bikestations WHERE kaupunki = 'Espoo' ORDER BY station_namefi`;
};

const getAllHelsinkiStations = async () => {
    return await sql`SELECT station_namefi FROM bikestations WHERE kaupunki <> 'Espoo' ORDER BY station_namefi`;
};

export { getAllEspooStations, getAllHelsinkiStations }