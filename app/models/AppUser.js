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
}
module.exports = AppUser