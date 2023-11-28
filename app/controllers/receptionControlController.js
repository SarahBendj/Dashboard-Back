const { ReceptionControle, Goods } = require("../models/index");
const dbClient = require("../services/dataBase");

const receptionControlController = {
  async showAll(request, response) {
    const receptionControles = await ReceptionControle.Allreceptions();

    response.json(receptionControles);
  },
  async showAllInformations(request, response) {
    const receptionControles = await ReceptionControle.AllreceptionsInfo();

    response.json(receptionControles);
  },

  async createOne(request, response) {
    await ReceptionControle.insertNew(request.body);
    const AllReceptionControls = await ReceptionControle.findAll();
    let newReceptionControl = { ...AllReceptionControls };

    const goods = await Goods.findAll();

    const {
      temperature,
      vehicle_compliance,
      packaging_condition,
      expiration_date,
      goods_id,
    } = request.body;
    //todo condition d'existance !!!

    for (let i = 0; i < goods.length; i++) {
      let key = goods[i];
      // correct goods values that should match
      let goodsId = key.id;
      let temperature_required = key.temperature_required;

      if (goodsId /*PRIMARYKEY)*/ == goods_id /*FOREIGNKEY)*/) {
        if (
          temperature !== temperature_required ||
          !vehicle_compliance ||
          !packaging_condition ||
          !expiration_date
        ) {
          //* we'll be needing this last id, to insert it in "warning Entity"
          
          for (key of AllReceptionControls.slice(-1))
          {
            const lastControlId = key.id;

            dbClient
              .query(
                ` INSERT INTO warning
                (reception_controle_id)VALUES( ${lastControlId})`
              )
              .then((result) => console.log(result));
          }
        }
        response.json(newReceptionControl);
      }
    }
   
  },
  async stats(request, response) {
    const  contributors = await ReceptionControle.contributorsStats();
    if(contributors) {
    response.json(contributors);
  } else {
    response.status(500).json({ message: "Resource not found" });
  }  

  },
};

module.exports = receptionControlController;
