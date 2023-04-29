import * as stationService from '../../services/stationServices.js';

const listStations = async ({ render }) => {
    const data = {
        stationsEspoo: await stationService.getAllEspooStations(),
        stationsHelsinki: await stationService.getAllHelsinkiStations(),
    }
    render('stations.eta', data);
};

export { listStations }