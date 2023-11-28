const Core = require('./Core')

class Supplier extends Core {
    static tableName = "supplier";

    constructor(obj){
        super(obj)
        this.name = obj.name;
        this.contact= obj.contact
    }
}
module.exports = Supplier