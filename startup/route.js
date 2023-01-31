const express = require('express');

const user = require('../route/user');
const category = require('../route/category');

module.exports= app => {
    app.use(express.json());
    app.use('/api/user', user);
    app.use('/api/category', category);
}