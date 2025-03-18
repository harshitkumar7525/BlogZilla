//Importing required modules
const { ref } = require("joi");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating a schema for blog
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    img:{
        url: String,
        filename: String
    },
    likes:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    isEdited: {
        type: Boolean,
        default: false
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});
//Exporting the model
module.exports = mongoose.model('Blog', blogSchema);
