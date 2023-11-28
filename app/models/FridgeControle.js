const Core = require('./Core')
const dbClient = require("../services/dataBase");

class Fridge_controle extends Core {
    static tableName = "fridge_controle"
  //  static ohterTableName = "fridge_controle"
    constructor(obj){
        super(obj)
        this.temperature = obj.temperature;
        this.app_user_id = obj.app_user_id;
        this.description = obj.description;
        this.fridge_id = obj.fridge_id;
        this.createdAt = obj.createdAt;
    }
    static async checkTemperature(id) {
      const sqlQuery = `SELECT * FROM ${this.tableName} WHERE "fridge_id"=${id}
      ORDER BY createdAt DESC
      limit 1
      `;
      
      const result = await dbClient.query(sqlQuery);
      return result.rows[0] ;
    }
      static async checkAlltemperatures(id) {
        const sqlQuery = `SELECT * FROM ${this.tableName} WHERE "fridge_id"=${id}
        `;
        const result = await dbClient.query(sqlQuery);
        return result.rows ;
      }
      static async FridgeToDelete(id) {
        const sqlQuery = `UPDATE ${this.tableName}
        SET fridge_id = null
         WHERE "fridge_id"=${id}
          `;
          const result = await dbClient.query(sqlQuery);
          return result.rows ;
      

    
}}
module.exports = Fridge_controle