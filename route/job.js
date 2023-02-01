const express = require('express');
const _  = require('lodash');

const { Category } = require('../model/category');
const { Job, validateJob } = require('../model/job');

const router = express.Router();

router.get('/', async(request, response) => {
    const jobs = await Job.find().sort('creationDate');
    return response.send(jobs);
})

router.post('/', async(request, response) => {
    const jobRequest = request.body;
    const { error } = validateJob(jobRequest);
    if (error) return response.status(400).send(error.details[0].message);
    jobRequest.categoryTag = await getCategoryTags(jobRequest.categoryIds);
    const job = new Job(jobRequest);
    await job.save();
    return response.send(job);
})

const getCategoryTags = async(categoryIds) => {
    const categoryTags = [];
    for (const objectId of categoryIds) {
        const category = await Category.findById(objectId).select('-__v');
        categoryTags.push(category);
    }
    return categoryTags;
}
module.exports = router;