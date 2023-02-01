const winston = require('winston');

module.exports = error = (err, request, response, next) => {
    winston.error(err.message, err);
    return response.status(500).send('Internal server error. Something failed!!.');
}