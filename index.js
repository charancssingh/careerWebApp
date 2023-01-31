const express = require('express');

const app =  express();

require('./startup/mongoDb')();
require('./startup/route')(app);

const port = 3000;
app.listen(port, () => console.log(`Connected to port ${port}`));
