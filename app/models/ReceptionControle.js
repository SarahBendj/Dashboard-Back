const Core = require('./Core')
const dbClient = require("../services/dataBase")

class Reception_controle extends Core {
    static tableName = "reception_controle"
    constructor(obj){
        super(obj)
        this.temperature = obj.temperature;
        this.vehicle_compliance = obj.vehicle_compliance;
        this.expiration_date = obj.expiration_date;
        this.app_user_id = obj.app_user_id;
        this.goods_id = obj.goods_id;
        this.supplier_id = obj.supplier_id;
        this.description = obj.description;
        this.createdAt = obj.createdAt;
        this.packaging_condition = obj.packaging_condition;  
    }
    static async  Allreceptions() {
        const sqlQuery = `SELECT * FROM ${this.tableName} 
        join warning on ${this.tableName}_id = ${this.tableName}.id`
        ;
        const result = await dbClient.query(sqlQuery);
        return result.rows ;
    } static async  AllreceptionsInfo() {
        const sqlQuery = `select reception_controle.id ,temperature, vehicle_compliance , packaging_condition , expiration_date , reception_controle.createdat ,reception_controle.description as "receptionDESC" , supplier.name as "supplierName", goods.name as "goodsName" ,warning.warning_status from reception_controle
        join supplier on supplier_id = supplier.id
        join goods on goods_id = goods.id
        left join warning on reception_controle_id = reception_controle.id`
        ;
        const result = await dbClient.query(sqlQuery);
        return result.rows 

    }static async  contributorsStats() {
            const sqlQuery = 
        `SELECT 
        reception_controle.supplier_id,
        supplier.name,
        COUNT(DISTINCT reception_controle.supplier_id) AS Contributors
        FROM reception_controle
        JOIN supplier ON supplier.id = reception_controle.supplier_id
    
    GROUP BY supplier.name , reception_controle.supplier_id; `
    const result = await dbClient.query(sqlQuery);
        return result.rows 
 
    
}}
module.exports = Reception_controle