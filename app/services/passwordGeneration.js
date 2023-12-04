const bcrypt = require("bcrypt")
const passwordGeneration = ( identificant ) => {
  
    let  insertPassword = (bcrypt.hashSync(identificant, 5)).slice(0, 10);

      return insertPassword

}

module.exports = { passwordGeneration }
       


