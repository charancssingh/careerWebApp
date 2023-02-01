const cors = require('cors');
const express = require('express');

const user = require('../route/user');
const category = require('../route/category');
const job = require('../route/job');
const error = require('../middleware/error');

module.exports= app => {
    app.use(cors());
    app.use(express.json());
    app.use('/api/user', user);
    app.use('/api/category', category);
    app.use('/api/job', job);
    app.use(error);
}