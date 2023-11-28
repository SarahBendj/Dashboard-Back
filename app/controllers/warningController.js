const { Warning } = require("../models/index");
const ApiError = require("../errorHandler/CoreError");

const warnigController = {
  async showAll(_, response) {
    const warnings = await Warning.findAll();
    response.json(warnings);
  },
  async fixWarning(request, response, next) {
    const id = parseInt(request.params.id, 10);
    await Warning.update(request.body, id)
    // show the warning by its id 
    fixedWarn = await Warning.findOne(id)

    if (fixedWarn) {
      response.json(fixedWarn);
    } else {
      next(new ApiError("operation dropped", 500));
    }
  },
 // this method show all warnings join to 
  async showAllWarnings(_, response) {
    const warnings = await Warning.joinWarning();
    if (warnings) {
      response.json(warnings);
    } else {
      next(new ApiError("operation dropped", 500));
    }
    
  },
  //this method show warnings by their status
  async filterOntrueWarning(_, response) {
    const warnings = await Warning.joinTrueWarningOnly();
    if (warnings) {
      response.json(warnings);
    } else {
      next(new ApiError("operation dropped", 500));
    }
  },
  async stats(_, response) {
    const warnings = await Warning.fixedSection();
    if (warnings) {
      response.json(warnings);
    } else {
      next(new ApiError("operation dropped", 500));
    }
  },


  

};
module.exports = warnigController;
