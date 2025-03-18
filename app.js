if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.DB_URL)
}
connectDB()
.then(()=>{
    console.log('DB connected');
})
.catch((err)=>{
    console.log(err);
})