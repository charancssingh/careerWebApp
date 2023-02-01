const express = require('express');
const config = require('config');
const constant = require('./constant/appConstant');

const app =  express();

require('./startup/mongoDb')();
require('./startup/route')(app);

app.listen(config.get(constant.PORT), () => console.log(`Connected to port ${constant.PORT}`));
