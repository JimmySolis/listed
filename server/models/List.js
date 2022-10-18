const { Schema, model } = require('mongoose');


const listSchema = new Schema({
    listName: {
        type: String,
        require: 'You need a name!',
        maxlength: 20,
        trim: true
    },
    listMaker: {
        type: String,
        require: true,
        maxlength: 20,
        trim: true
    },
    createdAt: {
        type: Date,
    },
    gifts:[ 
    {
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
    },
  ],
});


const List = model('List', listSchema)

module.exports = List;