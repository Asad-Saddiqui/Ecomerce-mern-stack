const mongoose = require('mongoose');

// Validation function to check if a value is a valid MongoDB ObjectID
const isValidObjectId = (value) => {
    return mongoose.Types.ObjectId.isValid(value);
};

// Middleware function to validate the request body
const validateRequestBody = (req, res, next) => {
    const { streetAddress, townCity, phoneNumber, items } = req.body;

    // Check if required fields are present
    if (!streetAddress || !townCity || !phoneNumber || !items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    
    for (const item of items) {
        // Check if color and size are arrays
        if (!Array.isArray(item.color) || !Array.isArray(item.size)) {
            return res.status(400).json({ error: 'Color and size must be arrays' });
        }

        // Check if cartId and prodId are valid MongoDB ObjectIDs
        if (!isValidObjectId(item.cartId) || !isValidObjectId(item.prodId)) {
            return res.status(400).json({ error: 'Invalid cartId or prodId' });
        }

        // Additional validation for color array (assuming it contains valid MongoDB ObjectIDs)
        for (const colorId of item.color) {
            if (!isValidObjectId(colorId)) {
                return res.status(400).json({ error: 'Invalid color ObjectId' });
            }
        }
    }

    next();
};

module.exports = validateRequestBody;
