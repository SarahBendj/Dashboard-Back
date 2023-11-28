const { FridgeControle, Fridge, Warning } = require("../models/index");
const dbClient = require("../services/dataBase");

const fridgeControlController = {
  async showAll(request, response) {
    const fridgeControls = await FridgeControle.findAll(); // findall ICI

    response.json(fridgeControls);
  },
  async oneTemperatureOfOneFridge(request, response) {
    const id = parseInt(request.params.id,10)
  
    const fridgeControls = await FridgeControle.checkTemperature(id)
   
    response.json(fridgeControls);
  },
  async AllTemperaturesOfOneFridge(request, response) {
    const id = parseInt(request.params.id,10)
   
    const fridgeControls = await FridgeControle.checkAlltemperatures(id)
  
    response.json(fridgeControls);
  },


  async createOne(request, response) {
   const newFridgeControl= await FridgeControle.insertNew(request.body);
    const Allfridges = await FridgeControle.findAll();
    
    // section to compare the temperatures
    const fridges = await Fridge.findAll();
    // the fridge that is currently controlled 
    let currentFridge_id = request.body.fridge_id;
    let currentTemperature = request.body.temperature;

    for (let i = 0; i < fridges.length; i++) {
      let key = fridges[i];
      //
      
      // correct fridge values that should match
      let fridgeId = key.id;
      let temperature_required = key.temperature_required;

      if (fridgeId == currentFridge_id) {
        if (currentTemperature !== temperature_required) {
          // plage de temperature)

          //* we'll be needing this last id, to insert it in "warning Entity"

          for (key of Allfridges.slice(-1)) {
            const lastControlId = key.id;

            dbClient
              .query(
                `INSERT INTO warning
               (fridge_controle_id)VALUES( ${lastControlId})`
              )
              .then((result) => console.log(result));
          }
        }
        response.json(newFridgeControl);
      }
    }
  },
};

//fridgeControlController.createOne()

module.exports = fridgeControlController;
