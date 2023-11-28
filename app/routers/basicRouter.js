const express = require("express");

const goodsController = require("../controllers/goodsController");
const fridgeController = require("../controllers/fridgeController");
const supplierController = require("../controllers/supplierController");
//validation dataMethod
const validate = require("../services/validate/method");
const schema = require("../services/validate/schemas");
const authentificate = require("../services/middleware/AuthentifByToken");
const isAdmin= require("../services/middleware/isAdmin");


const router = express.Router();

//*GOODS
router.get("/goods",  goodsController.showAll);
router.post("/goods", isAdmin, validate.method("body", schema.FridgeOrGoods),goodsController.createOne);

//*FRIDGES
router.get("/fridges",authentificate,  fridgeController.showAll);
router.get("/fridges/infos/:id",fridgeController.showOneFridge); // fridgesinfo
router.post("/fridges", fridgeController.createOne);
router.put("/fridges/:id", isAdmin, fridgeController.updateOne);
router.delete("/fridges/:id", isAdmin, fridgeController.deleteOne);
//*SUPPLIERS
router.get("/suppliers",  supplierController.showAll);
router.post("/suppliers",isAdmin, supplierController.createOne);
router.patch("/suppliers/:id",isAdmin, supplierController.updateOne);
router.delete("/suppliers/:id",isAdmin, supplierController.deleteOne );


module.exports = router;
