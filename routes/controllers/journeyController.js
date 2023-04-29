import * as journeyService from "../../services/journeyServices.js";

const listJourneys = async ({ render }) => {
    const data = {
        journeys: await journeyService.getJourneys(),
    }
    render('journeys.eta', data);
}

export { listJourneys }