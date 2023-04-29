import { sql } from "../database/database.js";

const getJourneys = async () => {
    return await sql`SELECT dept_station, return_station, (distance / 1000) AS distance, FLOOR(duration / 60) AS duration FROM citybiketrips LIMIT 100`;
}

export { getJourneys }