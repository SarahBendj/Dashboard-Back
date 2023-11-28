const express = require('express');
const router = express.Router();
const warningController = require('../controllers/warningController');
const authentificate = require('../services/middleware/AuthentifByToken')
 //*validation Bloc
 const validate = require("../services/validate/method");
 const schema = require("../services/validate/schemas");

 //const isAdmin= require("../services/middleware/isAdmin");

//*WARNINGS
router.get('/warnings',authentificate, warningController.showAll)
router.get('/warnings/infos',authentificate, warningController.showAllWarnings)
router.get('/warnings/infos/true',authentificate, warningController.filterOntrueWarning)
router.get('/warnings/notifyalarms',authentificate, warningController.notifyAWarning)
router.get('/warnings/stats',authentificate, warningController.stats)
router.patch('/warnings/:id',(validate.method('body',schema.Warning)),authentificate, warningController.fixWarning)


module.exports = router;