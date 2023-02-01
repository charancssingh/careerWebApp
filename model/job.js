const mongoose = require('mongoose');
const joi = require('joi');
const joiObjectId = require('joi-objectid');
joi.objectId= joiObjectId(joi);

const constant = require('../constant/appConstant')
const { categorySchema } = require('./category');

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        min:3,
        max:150,
        required:true
    },
    companyName: {
        type: String,
        min:3,
        max:150,
        required:true
    },
    applyLinkUrl: {
        type: String,
        min: 3,
        required: true,
    },
    categoryTag: {
        type: [categorySchema],
        required: true
    },
    creationDate: {
        type:Date,
        required:true,
        default:Date.now
    },
    logoUrl: {
        type: String,
        min: 3
    },
    responsibility: {
        type: String,
        min: 3
    },
    qualification: {
        type: String,
        min: 3
    },
    experience: {
        type: String,
        min: 3
    },
    salary : {
        type: String
    }
}, { collection: constant.JOB_COLLECTION_NAME });

const Job = mongoose.model(constant.JOB_COLLECTION_NAME, jobSchema);

const validateJob = job => {
    const schema = joi.object({
        title: joi.string().min(3).max(150).required(),
        companyName: joi.string().min(3).max(150).required(),
        applyLinkUrl: joi.string().min(3).required(),
        categoryIds: joi.array().items(joi.objectId()).required(),
        logoUrl: joi.string().min(3),
        responsibility: joi.string().min(3),
        qualification: joi.string().min(3),
        experience: joi.string().min(3),
        salary: joi.string().min(3)
    });
    return schema.validate(job);
}

exports.Job = Job;
exports.validateJob = validateJob;
