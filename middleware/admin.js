const config = require('config');

const constant = require('../constant/appConstant');

module.exports = admin = (request, response, next) => {
    if (!config.get(constant.REQUIRES_AUTH)) return next();
    if (!request.user.isAdmin) return response.status(403).send('User is not allowed to perform this operation. Access denied!');
    return next();
}