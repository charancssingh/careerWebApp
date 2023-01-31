const mongoose = require('mongoose');
const joi = require('joi');

const constant = require('../constant/appConstant');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 200,
        required: true
    }
}, {collection : constant.categoryCollectionName });

const Category = mongoose.model(constant.categoryCollectionName, categorySchema);

const validateCategory = category => {
    const schema = joi.object({
        name : joi.string().min(2).max(200).required()
    });
    return schema.validate(category);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validateCategory = validateCategory;