const { AppUser } = require("../models/index");
const {passwordGeneration}  = require('../services/passwordGeneration')
const ApiError = require("../errorHandler/CoreError");
const { sendWelcomeEmail } = require("../services/emailing/emailService");

const appUserController = {
  async showAll(request, response) {
    const users = await AppUser.showUsers();
    if (users) {
      response.json(users);
    } else {
      next(new ApiError("no data", 500));
    }
  },
  async showAllInfo(request, response) {
    const users = await AppUser.findAll();
    if (users) {
      response.json(users);
    } else {
      next(new ApiError("no data", 500));
    }
  },

  async createOne(request, response, next) {
    // 1. The list that needs to be filled
    let { lastname, email, firstname, role } = request.body;
    //2. GET the user by its email
    const user = await AppUser.checkEmails(email);
    //3. setup an algo for the code
    const code = Math.ceil(Math.random() * 10000);
    lastname = lastname.replace(/\s/, "");
    const identificant = `${lastname}${code}`;
    //4. GET THE USER BY ITS IDENTIFICANT
    const userIdentif = await AppUser.checkIdentificant(identificant);

    //5. THESE 2 CONDITIONS BELOW NEED TO BE SATISFIED
    if (!user && !userIdentif) {
     
      // conditions satisfied => it'd call a function that generates a password
      const insertPassword = passwordGeneration(identificant)
      //7. INSERT THE NEW USER
      const newUser = await AppUser.insertNew({
        firstname,
        lastname,
        identificant: identificant,
        password: insertPassword,
        email,
        role,
      });

      sendWelcomeEmail(newUser);

      delete newUser.password

      return response.status(201).json(newUser);

    } else {
      next(new ApiError("A user with this email already exist", 400));
    }
  },
  async dropOffUser(request, response, next) {
    const id = parseInt(request.params.id, 10);
    await AppUser.dropUserRights(id);
    const user = await AppUser.findOne(id);
    if (user) {
      response.json(user);
    } else {
      next(new ApiError("no data", 500));
    }
  },

  async displayLastUsersStats(_, response) {
    const users = await AppUser.showLastActivities();
    if (users) {
      response.json(users);
    } else {
      next(new ApiError("no data", 500));
    }
  },
};

module.exports = appUserController;
