const { AppUser } = require("../../models/index");
const {passwordGeneration}  = require('../../services/passwordGeneration')
const { sendForgottenPasswordEmail } = require("../../services/emailing/emailService");
const ApiError = require("../../errorHandler/CoreError");

const forgottenPassword = {
  async resetPassword(request, response, next) {
    //champs a remplir par le user tout bete qui a oublié son mdp
    const { email, identificant } = request.body;
    // verification du user par son email
    const user = await AppUser.checkEmails(email);
    // identificant de cet email
    const userIdentificant = user.identificant;
    const userId = user.id;
    // verification du couple identif/email

    if (user && identificant == userIdentificant) {
       // conditions satisfied => it'd call a function that generates a password
        const insertPassword = passwordGeneration(identificant)
        // then , update data in BDD before turning it to user
      await AppUser.update({ password: insertPassword }, userId);
     
      const updatedUser = await AppUser.findOne(userId)
     // send to user the new password by their email
      sendForgottenPasswordEmail(updatedUser);
      response.status(201).json('password has been successfully provided , please check your emailBox')
    }
    else {
        next(new ApiError("identificant or Email incorrect", 400));

    }
  },
};
module.exports = forgottenPassword;
