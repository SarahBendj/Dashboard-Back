const { Goods } = require("../models/index");
const ApiError = require("../errorHandler/CoreError");


const goodsController = {
  async showAll(request, response) {
    const goodss = await Goods.findAll();
    response.json(goodss);
  },
  async createOne(request, response) {
   const newGoods =  await Goods.insertNew(request.body);
  if(newGoods){
    response.json(newGoods);
  }else {
    next(new ApiError("no data", 500));
  }
    
  },
};
module.exports = goodsController;
