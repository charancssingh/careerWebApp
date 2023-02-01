const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const constant = require('../constant/appConstant');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    },
    isAdmin: Boolean
},{ collection: constant.userCollectionName });

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id:this._id, name: this.name, email: this.email, isAdmin : this.isAdmin}, config.get(constant.jwtPrivateKey));
}

const User = mongoose.model(constant.userCollectionName, userSchema);

const validateUser = user => {
    const schema = joi.object({
        name : joi.string().min(3).max(50).required(),
        email : joi.string().min(5).max(250).required().email(),
        password : joi.string().min(5).max(250).required()
    })
    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;