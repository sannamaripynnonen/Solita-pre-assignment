import * as stationService from '../../services/stationServices.js';

const listStations = async ({ render }) => {
    const data = {
        stationsEspoo: await stationService.getAllEspooStations(),
        stationsHelsinki: await stationService.getAllHelsinkiStations(),
    }
    render('stations.eta', data);
};

const showStation = async ({ render, params }) => {
    let month = ''
    if (params.month == "may") {
        month = '2021-05';
    } else if (params.month == 'june') {
        month = '2021-06';
    } else if (params.month == 'july') {
        month = '2021-07';
    } else {
        month = '2021-';
    }

    const data = {
        details: await stationService.getDetailsById(params.id, month),
    }
    console.log(data.details.top_dept)
    render('station.eta', data);
}

const searchStation = async ({ render, request }) => {
    const body = request.body();
    const params = await body.value;
    const station = params.get('station');

    const data = {
        stations: await stationService.getStation(station),
    }
    render('searchedStation.eta', data);
}

export { listStations, showStation, searchStation }