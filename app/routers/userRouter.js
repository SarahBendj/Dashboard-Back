const express = require('express');
const router = express.Router();
const appUserController = require('../controllers/appUserController');
const loginController = require('../controllers/authentification/loginController');
const updatePasswordController = require('../controllers/authentification/updatePasswordController');
const forgottenPassword = require('../controllers/authentification/forgottenPassword');
//AUTEHNTIFICATION 
const authentificate = require('../services/middleware/AuthentifByToken')
//validation dataMethod
const validate = require("../services/validate/method");
const schema = require("../services/validate/schemas");

const isAdmin= require("../services/middleware/isAdmin");

//*USERS
router.get('/users/info',authentificate ,/*superadmin*/appUserController.showAllInfo);
router.get('/users',authentificate,isAdmin,appUserController.showAll);
router.get('/users/stats',authentificate,appUserController.displayLastUsersStats);
router.post('/users',authentificate,isAdmin,validate.method('body',schema.AddUser), appUserController.createOne);

router.post('/login',validate.method('body',schema.Login), loginController.checkMemberData);
1
router.post('/login/reset', forgottenPassword.resetPassword);

router.patch('/users/:id', authentificate,validate.method('body',schema.changePassword),updatePasswordController.changingPassword);

router.patch('/users/delete/:id',authentificate, isAdmin, appUserController.dropOffUser);


module.exports = router;
