//Importing required modules
const { ref } = require("joi");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//Creating a schema for user
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    blogs:[
        {
            type:Schema.Types.ObjectId,
            ref:'Blog'
        }
    ]
});

//adding passport-local-mongoose to userSchema for authenicating user
userSchema.plugin(passportLocalMongoose);
//Exporting the User model

module.exports = mongoose.model('User', userSchema);