const Core = require('./Core')

class Goods extends Core {
    static tableName = "goods";

    constructor(obj){
        super(obj)
        this.name = obj.name;
        this.temperature_required= obj.temperature_required
    }
}
module.exports = Goods