const mongoose = require('mongoose');
const joi = require('joi');
const joiObjectId = require('joi-objectid');
joi.objectId= joiObjectId(joi);

const constant = require('../constant/appConstant')

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
        type: category
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
}, { collection: constant.jobCollectionName });

const Job = mongoose.model(constant.jobCollectionName, jobSchema);

const validateJob = job => {
    const schema = joi.object({
        title: joi.string().min(3).max(150).required(),
        companyName: joi.string().min(3).max(150).required(),
        applyLinkUrl: joi.string().min(3).required(),
        categoryIds: joi.array().items(joi.objectId()),
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
