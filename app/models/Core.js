const { response } = require("express");
const dbClient = require("../services/dataBase");
class Core {
  constructor(obj) {
    if (obj.id) {
      this.obj.id;
    }
  }
  static async findAll() {
    try {
      const response = await dbClient.query(`SELECT * FROM ${this.tableName}`);

      return response.rows;
    } catch (error) {
      console.error(error, "erreur");
    }
  }
  

  static async insertNew(body) {
    const columns = [];
    const values = [];
    let counter = 1;
    const parameters = [];

    Object.entries(body).forEach(([key, value]) => {
      columns.push(key);
      values.push(value);
      parameters.push(`$${counter}`);
      counter++;
    });

    const sqlQuery = `
                INSERT INTO ${
                  this.tableName
                } (${columns.join()}) VALUES (${parameters.join()}) RETURNING *;
            `;

    const response = await dbClient.query(sqlQuery, values);
    return response.rows[0];
  }
  static async update(body, id) {
    const fields = [];
    const values = [];
    let counter = 1;
    Object.entries(body).forEach(([key, value]) => {
      // on va passer une boucle sur chaque couple clé valeur sauf pour celui ou clé est id
      if (key != "id") {
        fields.push(key + "=$" + counter); // ok
        values.push(value); //ok
        counter++;
      }
    });

    values.push(id);

    const sqlQuery = `
                    UPDATE ${this.tableName} SET 
                    ${fields.join()}
                    WHERE id=$${counter};
                `;

    const response = await dbClient.query(sqlQuery, values);

    return response.rows[0];
  }
  static async findOne(id) {
    const sqlQuery = `SELECT * FROM ${this.tableName} WHERE id=${id}`

        const response = await dbClient.query(sqlQuery);
      return response.rows[0];
    
  }
  static async delete(id) {
    const response = await dbClient.query(
      `DELETE  FROM ${this.tableName} WHERE id=${id}`
    );
    return response.rows[0];
  }
  //*section JOINING ENTITIES

 

 

}

module.exports = Core;
