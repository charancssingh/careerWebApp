const winston = require('winston');
const moment= require('moment')
require('winston-mongodb');
const config = require('config');

const constant = require('../constant/appConstant');

module.exports = function(){
    winston.add(
        new winston.transports.Console({colorize:true, preetyPrint:true}),
        new winston.transports.File({filename:'uncaughtException.log'}));

    process.on('unhandledRejection',(ex)=>{
        throw ex;
    });
    winston.add(new winston.transports.File({ filename: `webapplogfile/${moment().format('YYYY-MM-DD:HH')}.log` }));
    winston.add(new winston.transports.MongoDB({
     db: config.get(constant.CONNECTION_STRING),
     level:'info',
     options: { useUnifiedTopology: true },
    }));
}