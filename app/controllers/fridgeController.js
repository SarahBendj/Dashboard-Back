//const dataMapper = require('../services/dataMapper')
const ApiError = require("../errorHandler/CoreError");
const { Fridge, FridgeControle } = require("../models/index");

const fridgeController = {
  async showAll(request, response, next) {
    const fridges = await Fridge.findAll();
    if (fridges) {
      response.json(fridges);
    } else {
      next(new ApiError("no data", 500));
    }
  },
  async showOneFridge(request, response, next) {
    const id = parseInt(request.params.id, 10);
    const fridges = await Fridge.findOne(id);
    if (fridges) {
      response.json(fridges);
    } else {
      next(new ApiError("no data", 500));
    }
  },
  async createOne(request, response) {
    const newFridge = await Fridge.insertNew(request.body);

    if (!newFridge) {
      return next(new ApiError("bad request", 400));
    }

    if (newFridge) {
      response.json(newFridge);
    } else {
      return next(new ApiError("operation dropped", 500));
    }
  },

  async updateOne(request, response, next) {
    const id = parseInt(request.params.id, 10);

    await Fridge.update(request.body, id);
    const Allfridges = await Fridge.findAll();
    let updateFridge = { ...Allfridges };

    if (updateFridge) {
      response.json(updateFridge);
    } else {
      next(new ApiError("operation dropped", 500));
    }
  },

  async deleteOne(request, response, next) {
    const id = parseInt(request.params.id, 10);
    //select the fridge that need to be deleted , drop the foreinkey by setting it null
    await FridgeControle.FridgeToDelete(id);
    // then , delete the frige
    const deleted = await Fridge.delete(id);
    if (!deleted) {
      response.status(200).json("fridge has been successfully deleted");
    } else {
      next(new ApiError("operation dropped", 500));
    }
  },
};

module.exports = fridgeController;
