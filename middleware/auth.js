const config = require('config');
const jwt = require('jsonwebtoken');

const constant = require('../constant/appConstant');

module.exports = auth = (request, response, next) => {
    if (!config.get(constant.REQUIRES_AUTH)) return next();
    const token = request.header(constant.HEADER_KEY);
    if (!token) return response.status(401).send("Access denied. No token provided.");
    try {
        request.user= jwt.verify(token, config.get(constant.JWT_PRIVATE_KEY));
        return next();
    }
    catch(exception){
        response.status(400).send(`Invalid token Error : ${exception}`);
    }
}