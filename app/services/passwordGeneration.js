const bcrypt = require("bcrypt")
const passwordGeneration = ( identificant ) => {
    // this should be a firstconne
    let  insertPassword = (bcrypt.hashSync(identificant, 5)).slice(0, 10);

      return insertPassword

}

module.exports = { passwordGeneration }
       


