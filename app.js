if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError.js');
const User = require("./models/user.js");
const blogRouter = require('./routers/blogRoute.js');
const commentRouter = require('./routers/blogRoute.js');
const userRouter = require('./routers/userRoute.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const locatStrategy = require('passport-local');

async function connectDB() {
    await mongoose.connect(process.env.DB_URL)
}
connectDB()
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log(err);
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine("ejs", ejsMate);
app.use(methodOverride('_method'));

const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    crypto: {
        secret: process.env.COOKIE_SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on('error', () => {
    console.log("Error im mongo store")
});

const sessionOptions = {
    store,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 3600 * 1000,
        maxAge: 7 * 24 * 3600 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new locatStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/", (req, res) => {
    res.redirect("/home");
})

app.use("/blogs", blogRouter);
app.use("/blogs/:id/comment", commentRouter);
app.use("/", userRouter);

app.get("/home", (req, res) => {
    res.render("./home/home.ejs");
})

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

app.use((err, req, res, next) => {
    let { status = 500, message = "Some error occurred" } = err;
    res.status(status).render("error.ejs", { err })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});