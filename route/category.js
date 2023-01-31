const express = require('express');

const { Category, validateCategory } = require('../model/category');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.get('/', async(request, response) => {
    const categories = await Category.find().sort('name');
    return response.send(categories);
});

router.get('/:id', validateObjectId, async(request, response) => {
    const objectId = request.params.id;
    const category = await Category.findById(objectId);
    return response.send(category);
});

router.post('/', async(request, response) => {
    const categoryRequest = request.body;
    await validateCategoryAndCheckEligiblity(categoryRequest, response);
    const category = new Category({name : categoryRequest.name });
    await category.save();
    return response.send(category);
});

router.put('/:id', validateObjectId, async(request, response) => {
    const categoryRequest = request.body;
    const objectId = request.params.id;
    const { error } = validateCategory(categoryRequest);
    if (error) return response.status(400).send(error.details[0].message);
    const category = await Category.findByIdAndUpdate(objectId, {name : categoryRequest.name },{new : true});
    if (!category) return response.status(400).send(`Object Id: ${objectId} doesn't present in database.`)
    return response.send(category);
});

router.delete('/:id', validateObjectId, async(request, response) => {
    const objectId = request.params.id;
    const category = await Category.findByIdAndRemove(objectId);
    if (!category) return response.status(400).send(`Object Id: ${objectId} doesn't present in database.`)
    return response.send(category);
});

const validateCategoryAndCheckEligiblity = async(categoryRequest, response) => {
    const { error } = validateCategory(categoryRequest);
    if (error) return response.status(400).send(error.details[0].message);
    const category = await Category.findOne({ name : categoryRequest.name });
    if (category) return response.status(400).send(`Category: ${categoryRequest.name} already present in DB. Can't create duplicate entry.`);
}

module.exports = router;