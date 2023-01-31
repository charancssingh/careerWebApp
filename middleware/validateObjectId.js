const mongoose = require('mongoose');

const validateObjectId = async(request, response, next) => {
    const objectId = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
        return response.status(400).send(`Invalid id: ${ objectId } provided!.`);
    }
    next();
}

module.exports = validateObjectId;