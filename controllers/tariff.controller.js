const Tariff = require("../models/tariffs");
exports.getTariffs = async function() {
    return await  Tariff.find({}).exec();
}
