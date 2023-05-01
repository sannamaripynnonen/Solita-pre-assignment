import * as journeyService from "../../services/journeyServices.js";

const listJourneys = async ({ render }) => {
    const data = {
        journeys: await journeyService.getJourneys(),
    }
    render('journeys.eta', data);
}

const searchJourney = async ({ render, request }) => {
    const body = request.body();
    const params = await body.value;
    const station = params.get('station');

    const data = {
        journeys: await journeyService.getJourneysByStation(station),
    }
    render('searchedJourney.eta', data);
}

export { listJourneys, searchJourney }