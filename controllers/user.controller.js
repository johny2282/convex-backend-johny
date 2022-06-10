const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user')
const bcrypt = require('bcrypt');
var Tariff = require('../models/tariffs')

exports.createUser = async function (tariff) {
    return await Tariff.create(tariff)
}

exports.login = async function (credentials) {
    let user = await User.findOne({account: credentials.account}).populate('tariff').exec();
    if (!user) {
        return false
    }
    try {
        // Сравниваем пароль с хешем сохраненным в Базе данных
        console.log(credentials.password, user.password)
        return await bcrypt.compare(credentials.password, user.password);
    } catch (error) {
        console.log(error);
        return false
    }
}

exports.getUser = async function(account) {
    return await  User.findOne({account: account}).populate('tariff').exec();
}

exports.paymentDo = async function(amount, id, card) {
    return await  User.findByIdAndUpdate(id, {$inc: {balance: amount}, $push: { payments: {timeLabel: new Date() ,amount: amount, card: card} }}, {new: true}).populate('tariff').exec();
}

exports.changePaused = async function(id, paused) {
    return await  User.findByIdAndUpdate(id, {paused: paused}, {new: true}).populate('tariff').exec();
}

exports.changeTariff = async function(id, tariff, price) {
    return await  User.findByIdAndUpdate(id, {tariff: tariff}, {new: true}).populate('tariff').exec();
}
