const { Schema, model } = require('mongoose');

const giftSchema = new Schema({
    giftName: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    giftUrl: {
        type: String,
        required: true,
        trim: true,
    },
    giftMaker: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
    }
});

const Gift = model('Gift', giftSchema);

module.exports = Gift;