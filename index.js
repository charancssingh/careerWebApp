const express = require('express');
const config = require('config');
const winston = require('winston');

const constant = require('./constant/appConstant');

const app =  express();

require('./startup/mongoDb')();
require('./startup/route')(app);
require('./startup/logging')();

const PORT = config.get(constant.PORT);
app.listen(PORT, () => winston.info(`Connected to port ${ PORT }`));
