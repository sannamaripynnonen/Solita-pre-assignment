import * as journeyService from '../../services/journeyServices.js';
import * as stationService from '../../services/stationServices.js';

const showMain = async ({ render }) => {
    const data = {
        stationsEspoo: await stationService.getAllEspooStations(),
        stationsHelsinki: await stationService.getAllHelsinkiStations(),
        trips: await journeyService.getJourneyCount(),
    }
    render('index.eta', data);
};

export { showMain };
