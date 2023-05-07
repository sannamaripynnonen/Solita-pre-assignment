import * as stationService from '../../services/stationServices.js';

const listStations = async ({ render }) => {
    const data = {
        stationsEspoo: await stationService.getAllEspooStations(),
        stationsHelsinki: await stationService.getAllHelsinkiStations(),
    }
    render('stations.eta', data);
};

const showStation = async ({ render, params, response }) => {
    let month = ''

    if (isNaN(params.id)) {
        response.type = "text/html; charset=utf-8";
        response.status = 404;
        response.body = "<h1>404, Page not found!</h1>";
    }

    if (params.month == "may") {
        month = '2021-05';
    } else if (params.month == 'june') {
        month = '2021-06';
    } else if (params.month == 'july') {
        month = '2021-07';
    } else if (params.month == undefined || params.month == 'may-july') {
        month = '2021-';
    } else {
        response.type = "text/html; charset=utf-8";
        response.status = 404;
        response.body = "<h1>404, Page not found!</h1>";
        return;
    }

    const data = {
        details: await stationService.getDetailsById(params.id, month),
    }

    // check if id is found from database
    if (data.details == undefined ) {
        response.type = "text/html; charset=utf-8";
        response.status = 404;
        response.body = "<h1>404, Page not found!</h1>";
    } else {
        render('station.eta', data);
    }
    
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