let mongoose  = require('mongoose');
let Schema = mongoose.Schema;

let TariffSchema = new Schema({
    id: String,
    name: String,
    options: [{
        type: {
            name: String,
            description: String,
            accentText: String
        }
    }],
    cost: Number
})

module.exports = mongoose.model('Tariff', TariffSchema)
