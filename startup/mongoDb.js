const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

const constant = require('../constant/appConstant');

module.exports = () => {
    const connectionString = config.get(constant.CONNECTION_STRING);
    mongoose.set("strictQuery", true);
    mongoose.connect(connectionString, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => winston.info(`Connected to mongoDb : ${connectionString}`))
    .catch(error => winston.error(`Error occurred while connecting mongoDb database : ${connectionString}, Error : ${error}`));
};