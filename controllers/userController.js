const User = require('../models/user.js');

module.exports.renderSignUpForm = (req, res) => {
    res.render("./users/signup.ejs");
};

module.exports.signUpUser = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to BlogZilla");
            res.redirect("/blogs");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogInForm = (req, res) => {
    res.render("./users/login.ejs");
};

module.exports.logInUser = async (req, res) => {
    req.flash("success", "Welcome back to BlogZilla");
    redirectUrl = res.locals.redirectUrl || "/blogs";
    res.redirect(redirectUrl);
};

module.exports.logOutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!")
        res.redirect("/blogs")
    })
};