const { AppUser } = require("../../models/index");
const ApiError = require("../../errorHandler/CoreError");
const bcrypt = require("bcrypt");

const updatePasswordController = {
  async changingPassword(request, response, next) {
    const id = parseInt(request.params.id);

    const { oldPassword, newPassword } = request.body;
    const user = await AppUser.findOne(id);
  
    if(user)
    try {
      const match = await bcrypt.compare(oldPassword, user.password);

      if (!match) {
        next(new ApiError("Passwords don't match", 500));
      }

      const newPasswordHashed = await bcrypt.hash(newPassword, 5);
      await AppUser.update({ password: newPasswordHashed }, id);
    

      return response.status(200).json("Password updated successfully");
    } catch (error) {
      console.error(error)
      return response.json(error.message)
    }
  },
};

module.exports = updatePasswordController;
