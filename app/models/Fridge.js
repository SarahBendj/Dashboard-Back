const Core = require('./Core')
const dbClient = require("../services/dataBase");

class Fridge extends Core {
    static tableName = "fridge";
    
    constructor(obj){
        super(obj)
        this.name = obj.name;
        this.temperature_required= obj.temperature_required
    }

  static async deleteOne(id) {
    const sqlQuery = `DELETE  FROM ${this.tableName} WHERE id=${id}`

        const response = await dbClient.query(sqlQuery);
      return response.rows[0];
        

    
  }
}
module.exports = Fridge