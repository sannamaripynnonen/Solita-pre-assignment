import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as mainController from "./controllers/mainController.js";
import * as journeyController from "./controllers/journeyController.js";
import * as stationController from "./controllers/stationController.js";

const router = new Router();

router.get('/', mainController.showMain);
router.get('/journeys', journeyController.listJourneys);
router.get('/stations', stationController.listStations);
router.get('/station/:id', stationController.showStation);
router.post('/stations/search', stationController.searchStation);
router.post('/journeys/search', journeyController.searchJourney);

export { router };

