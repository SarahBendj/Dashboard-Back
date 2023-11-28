const { Supplier } = require('../models/index')
const ApiError = require("../errorHandler/CoreError");

const supplierController = {
    
    async showAll(request ,response){
        const suppliers = await Supplier.findAll()
        response.json(suppliers)
    },
    async createOne(request, response) {
        const newSupplier = await Supplier.insertNew(request.body);
        if(newSupplier){
            response.json(newSupplier);
         }else {
            next(new ApiError("no data", 500));
          }
       
      },
      async updateOne(request, response, next) {
        const id = parseInt(request.params.id, 10);
    
        await Supplier.update(request.body, id);
        const Allsuppliers = await Supplier.findAll();
        let updateSupplier = { ...Allsuppliers };
    
        if (updateSupplier) {
          response.json(updateSupplier);
        } else {
          next(new ApiError("operation dropped", 500));
        }
      },
    
      async deleteOne(request, response, next) {
        const id = parseInt(request.params.id, 10);
        const deleted = await Supplier.delete(id);
        if (!deleted) {
          response.status(200).json("Supplier has been successfully deleted");
        } else {
          next(new ApiError("operation dropped", 500));
        }
      },
    };

module.exports = supplierController