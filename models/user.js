var mongoose  = require('mongoose');
var Schema = mongoose.Schema;
var Tariff = require('./tariffs');

var UserSchema = new Schema({
    id: String,
    account: String,
    password: String,
    balance: Number,
    privateInfo: {
        firstName: String,
        secondName: String,
        lastName: String,
        dateOfBirthday: Date,
        phone: String,
    },
    bonuses: Number,
    tariff:  {type: mongoose.Schema.Types.ObjectId, ref: 'Tariff'},
    payments: {
        type: [],
        default: []
    },
    email: {type: String, default: null},
    enablePushNotification: {type: Boolean, default: true},
    paused: {type: Boolean, default: false}
})

module.exports = mongoose.model('User', UserSchema)
