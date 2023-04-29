import { sql } from "../database/database.js";

// TODO: List journeys (hard-code limit) with departure and return stations, 
// distance in km and duration in minutes
const getJourneys = async () => {
    return await sql`SELECT dept_station, return_station, (distance / 1000) AS distance, FLOOR(duration / 60) AS duration FROM citybiketrips LIMIT 100`;
}

export { getJourneys }