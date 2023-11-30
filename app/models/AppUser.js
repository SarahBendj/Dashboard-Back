const Core = require('./Core')
const dbClient = require("../services/dataBase");
class AppUser extends Core {
    static tableName = "app_user";
    constructor(obj){
        super(obj)
        this.firstname = obj.firstname;
        this.lastname= obj.lastname;
        this.code = obj.code;
        this.email = obj.email;
        this.password= obj.password;
        this.role= obj.role;
    }
    static async checkEmails(email) {
       
        const sqlQuery = `SELECT * FROM app_user WHERE "email"='${email}'`;
        
        const result = await dbClient.query(sqlQuery);
        return result.rows[0] ;
    }
    static async checkIdentificant(identificant) {
       
        const sqlQuery = `SELECT * FROM app_user WHERE "identificant"='${identificant}'`;
        
        const result = await dbClient.query(sqlQuery);
        return result.rows[0] ;
}
static async showUsers(identificant) {
       
    const sqlQuery = `SELECT id ,firstname,lastname,identificant,role ,createdat , user_status FROM ${this.tableName}`;
    
    const result = await dbClient.query(sqlQuery);
    
    return result.rows ;
}
static async dropUserRights(id) {
       
    const sqlQuery = `UPDATE ${this.tableName} 
                      SET user_status ='false',password='null', email='null'
                      WHERE id=${id}`;
    
    const result = await dbClient.query(sqlQuery);

    return result.rows[0] ;
}
static async showLastActivities(){
    const sqlQuery = `SELECT 
    app_user.identificant, 
    COALESCE(DATE(fridge_controle.createdat), DATE(reception_controle.createdat)) AS controle_date,
    MAX(fridge_controle.id + reception_controle.id) AS max_controle 
FROM app_user
LEFT JOIN fridge_controle ON app_user.id = fridge_controle.app_user_id
LEFT JOIN reception_controle ON app_user.id = reception_controle.app_user_id
GROUP BY app_user.identificant, controle_date
HAVING COALESCE(DATE(fridge_controle.createdat), DATE(reception_controle.createdat)) IS NOT NULL
ORDER BY max_controle ASC;

`
const result = await dbClient.query(sqlQuery);

return result.rows ;
}
}
module.exports = AppUser