const { Schema, model } = require('mongoose');


const listSchema = new Schema({
    listName: {
        type: String,
        require: true,
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
        type: Schema.Types.ObjectId,
        ref: 'Gift'
    },
  ],
});


const List = model('List', listSchema)

module.exports = List;