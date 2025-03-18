//Importing the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating the schema
const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

//creating and exporting the model
module.exports = mongoose.model('Comment', commentSchema);