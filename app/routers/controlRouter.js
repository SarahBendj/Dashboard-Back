const express = require('express');
const router = express.Router();
/*connection all the controls to the router */
const fridgeControlController = require('../controllers/fridgeControlController');
const receptionControlController = require('../controllers/receptionControlController');
const authentificate = require('../services/middleware/AuthentifByToken')
//validation dataMethod
const validate = require("../services/validate/method");
const schema = require("../services/validate/schemas");

//*RECEPTIONCONTROLS
router.get('/receptioncontrols', authentificate,receptionControlController.showAll);
router.post('/receptioncontrols',authentificate,validate.method('body',schema.Reception), receptionControlController.createOne);
router.get('/receptioncontrols/info',authentificate,receptionControlController.showAllInformations)

//*FRIDGECONTROLS
router.get('/fridgecontrols',authentificate, fridgeControlController.showAll);
router.get('/fridgecontrols/:id',authentificate, fridgeControlController.oneTemperatureOfOneFridge)//ça onefridgecontrols/:id
router.get('/fridgecontrols/:id/list',authentificate,fridgeControlController.AllTemperaturesOfOneFridge)// ça allcontrols/:id
router.post('/fridgecontrols',authentificate, fridgeControlController.createOne);
//*stats
router.get('/receptioncontrols/stats', authentificate, receptionControlController.stats)


module.exports = router;

