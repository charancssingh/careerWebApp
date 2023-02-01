const config = require('config');
const jwt = require('jsonwebtoken');

const constant = require('../constant/appConstant');

module.exports = auth = (request, response, next) => {
    if (!config.get(constant.requiresAuth)) return next();
    const token = request.header(constant.headerKey);
    if (!token) return response.status(401).send("Access denied. No token provided.");
    try {
        request.user= jwt.verify(token, config.get(constant.jwtPrivateKey));
        return next();
    }
    catch(exception){
        response.status(400).send(`Invalid token Error : ${exception}`);
    }
}