const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const UserController = require('./controllers/user.controller')
const TariffController = require('./controllers/tariff.controller')
// Загрузим express
const app = express();
// Создадим новый сервер
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/convex');

app.get('/api/test',(req,res,next)=>{
    //Создадим новый handler который сидит по пути `/`
    res.send('Hello, World!');
    // Отправим привет миру!
});

app.post('/api/tariff/create',async (req,res,next)=>{
    //Создадим новый handler который сидит по пути `/`
    if (!req.body) {
        res.status(400).send({status: 'error', message: 'Некорректная структура запроса'})
    }
    // Проверяем все ли поля входящего запроса присутствуют, если нет возвращаем ошибку с кодом 400
    try {
        let answer = await UserController.createUser(req.body)
        // Пытаемся вызвать функцию создания пользователя из контроллера UserController
        res.status(200).send({status: 'success', message: answer})
        // В случае успешного выполнения функции создания пользователя возвращаем на фронтенд результат с кодом 200
    } catch {
        res.status(400).send({status: 'error', message: 'Ошибка при создании пользователя'})
        // В случае неуспешного выполнения функции создания пользователя возвращаем на фронтенд ошибку с кодом 400
    }
    // Обернем создание пользователя в конструкцию Попытка...Исключение. Это позволит избежать остановки сервера по ошибке в случае неуспешного завершения операции
});

app.post('/api/user/login',async (req,res,next)=>{
    //Создадим новый handler который сидит по пути `/`
    console.log(req.body)
    if (!req.body || !req.body.credentials) {
        res.status(400).send({status: 'error', message: 'Некорректная структура запроса'})
    }
    // Проверяем все ли поля входящего запроса присутствуют, если нет возвращаем ошибку с кодом 400
    try {
        let answer = await UserController.login(req.body.credentials)
        // Пытаемся вызвать функцию создания пользователя из контроллера UserController
        console.log(answer)
        res.status(200).send({status: 'success', message: answer})
        // В случае успешного выполнения функции создания пользователя возвращаем на фронтенд результат с кодом 200
    } catch {
        res.status(400).send({status: 'error', message: 'Ошибка при создании пользователя'})
        // В случае неуспешного выполнения функции создания пользователя возвращаем на фронтенд ошибку с кодом 400
    }
    // Обернем создание пользователя в конструкцию Попытка...Исключение. Это позволит избежать остановки сервера по ошибке в случае неуспешного завершения операции
});

app.post('/api/user/get',async (req,res,next)=>{
    //Создадим новый handler который сидит по пути `/`
    if (!req.body || !req.body.account) {
        res.status(400).send({status: 'error', message: 'Некорректная структура запроса'})
    }
    // Проверяем все ли поля входящего запроса присутствуют, если нет возвращаем ошибку с кодом 400
    try {
        let answer = await UserController.getUser(req.body.account)
        // Пытаемся вызвать функцию создания пользователя из контроллера UserController
        console.log(answer)
        res.status(200).send({status: 'success', message: answer})
        // В случае успешного выполнения функции создания пользователя возвращаем на фронтенд результат с кодом 200
    } catch {
        res.status(400).send({status: 'error', message: 'Ошибка при получении пользователя'})
        // В случае неуспешного выполнения функции создания пользователя возвращаем на фронтенд ошибку с кодом 400
    }
    // Обернем создание пользователя в конструкцию Попытка...Исключение. Это позволит избежать остановки сервера по ошибке в случае неуспешного завершения операции
});

app.post('/api/user/paymentDo',async (req,res,next)=>{
    //Создадим новый handler который сидит по пути `/`
    if (!req.body || !req.body.id ||!req.body.card || !req.body.amount) {
        return res.status(400).send({status: 'error', message: 'Некорректная структура запроса'})
    }
    // Проверяем все ли поля входящего запроса присутствуют, если нет возвращаем ошибку с кодом 400
    try {
        let answer = await UserController.paymentDo(req.body.amount, req.body.id, req.body.card)
        // Пытаемся вызвать функцию создания пользователя из контроллера UserController
        return res.status(200).send({status: 'success', message: answer})
        // В случае успешного выполнения функции создания пользователя возвращаем на фронтенд результат с кодом 200
    } catch {
        return res.status(400).send({status: 'error', message: 'Ошибка при осуществлении платежа'})
        // В случае неуспешного выполнения функции создания пользователя возвращаем на фронтенд ошибку с кодом 400
    }
    // Обернем создание пользователя в конструкцию Попытка...Исключение. Это позволит избежать остановки сервера по ошибке в случае неуспешного завершения операции
});

app.post('/api/user/changeTariff',async (req,res,next)=>{
    //Создадим новый handler который сидит по пути `/`
    console.log(req.body)
    if (!req.body || !req.body.id || !req.body.tariff) {
        return res.status(400).send({status: 'error', message: 'Некорректная структура запроса'})
    }
    // Проверяем все ли поля входящего запроса присутствуют, если нет возвращаем ошибку с кодом 400
    try {
        let answer = await UserController.changeTariff(req.body.id, req.body.tariff)
        // Пытаемся вызвать функцию создания пользователя из контроллера UserController
        return res.status(200).send({status: 'success', message: answer})
        // В случае успешного выполнения функции создания пользователя возвращаем на фронтенд результат с кодом 200
    } catch {
        return res.status(400).send({status: 'error', message: 'Ошибка при смене тарифа'})
        // В случае неуспешного выполнения функции создания пользователя возвращаем на фронтенд ошибку с кодом 400
    }
    // Обернем создание пользователя в конструкцию Попытка...Исключение. Это позволит избежать остановки сервера по ошибке в случае неуспешного завершения операции
});

app.get('/api/tariff/getAll',async (req,res,next)=>{
    let answer = await TariffController.getTariffs()

    return res.status(200).send({status: 'success', message: answer})
    // Отправим привет миру!
});

// Запустим сервер на порту 3000 и сообщим об этом в консоли.
// Все Worker-ы должны иметь один и тот же порт
app.listen(3000,function(err){
    if(err) console.error(err);
        // Если есть ошибка сообщить об этом
    // Приложение закроется т.к. нет больше handler-ов
    else console.log(`Running server at port 3000!`)
    // Иначе сообщить что мы успешно соединились с мастером
    // И ждем сообщений от клиентов
});
