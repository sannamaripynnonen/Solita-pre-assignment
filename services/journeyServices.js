import { sql } from "../database/database.js";

const getJourneys = async () => {
    return await sql`SELECT dept_station, return_station, ROUND((distance / 1000)::numeric, 1) AS distance, FLOOR(duration / 60) AS duration FROM citybiketrips LIMIT 100`;
}

const getJourneyCount = async () => {
    const trips = await sql`SELECT COUNT(*) FROM citybiketrips`
    return trips[0];
}

const getJourneysByStation = async (station) => {
    return await sql`SELECT dept_station, return_station, ROUND((distance / 1000)::numeric, 1) AS distance, FLOOR(duration / 60) AS duration FROM citybiketrips WHERE dept_station iLIKE '%' || ${station} || '%' OR return_station iLIKE '%' || ${station} || '%' LIMIT 100`;
}

export { getJourneys, getJourneyCount, getJourneysByStation }