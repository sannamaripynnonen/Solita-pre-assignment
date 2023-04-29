import * as stationService from '../../services/stationServices.js';

const listStations = async ({ render }) => {
    const data = {
        stationsEspoo: await stationService.getAllEspooStations(),
        stationsHelsinki: await stationService.getAllHelsinkiStations(),
    }
    render('stations.eta', data);
};

const showStation = async ({ render, params }) => {
    const data = {
        details: await stationService.getDetailsById(params.id),
    }
    render('station.eta', data);
}

export { listStations, showStation }