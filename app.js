if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const path = require('path');
const ExpressError = require('./utils/ExpressError.js');

async function connectDB() {
    await mongoose.connect(process.env.DB_URL)
}
connectDB()
.then(()=>{
    console.log('DB connected');
})
.catch((err)=>{
    console.log(err);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/test",(req,res)=>{
    res.send("Server is running");
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

app.use((err, req, res, next) => {
    let { status = 500, message = "Some error occurred" } = err;
    res.status(status).render("error.ejs", { err })
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});