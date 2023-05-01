import { sql } from "../database/database.js";

const getJourneys = async () => {
    return await sql`SELECT dept_station, return_station, (distance / 1000) AS distance, FLOOR(duration / 60) AS duration FROM citybiketrips LIMIT 100`;
}

const getJourneysByStation = async (station) => {
    return await sql`SELECT dept_station, return_station, (distance / 1000) AS distance, FLOOR(duration / 60) AS duration FROM citybiketrips WHERE dept_station iLIKE '%' || ${station} || '%' OR return_station iLIKE '%' || ${station} || '%' LIMIT 100`;
}

export { getJourneys, getJourneysByStation }