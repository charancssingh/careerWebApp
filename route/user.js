const express = require('express');
const bcrypt = require('bcrypt');
const _  = require('lodash');

const { User, validateUser } = require('../model/user');

const router = express.Router();

router.get('/me', async (request, response) => {
    const user = await User.findById(request.user._id).select('-password');
    return response.send(user);
})

router.post('/login', async (request, response) => {
    const userRequest = request.body;
    const user = await User.findOne({email: userRequest.email});
    if (!user) return response.status(401).send(`Invalid Email Id and password provided!.`);
    const matchPassword =  await bcrypt.compare(userRequest.password, user.password);
    if (!matchPassword) return response.status(401).send(`Invalid Email Id and password provided!.`);
    generateAuthTokenAndReturnResponse(user, response);
})

router.post('/', async (request, response) => {
    const userRequest = request.body;
    await validateUserRequestAndCheckEligiblity(userRequest, response);
    const user = new User(_.pick(userRequest, ['name', 'email', 'password']));
    await encryptPassword(user);
    await user.save();
    generateAuthTokenAndReturnResponse(user, response);
});

const validateUserRequestAndCheckEligiblity = async(userRequest, response) => {
    const { error } = validateUser(userRequest);
    if (error) {
        return response.status(400).send(error.details[0].message);
    }
    const existingUser = await User.findOne({email: userRequest.email});
    if (existingUser) {
        return response.status(400).send(`This email: ${userRequest.email} is already registered!.`);
    }
}

const encryptPassword = async user => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
}

const generateAuthTokenAndReturnResponse = (user, response) => {
    const token = user.generateAuthToken();
    return response.header('x-auth-token',token)
    .header('access-control-expose-headers','x-auth-token')
    .send(_.pick(user, ['_id', 'name', 'email']));
}

module.exports = router;