const Blog = require('../models/blog.js');
const Comment = require('../models/comment.js');
const { blogSchema, commentSchema } = require('./Schema.js');
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'Please login first');
        return res.redirect('/login');
    }
    next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let blog = await Blog.findById(id);
    if (!blog.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have the owner rights for this blog");
        return res.redirect(`/blogs/${id}`);
    }
    next();
};
module.exports.validateBlog = (req, res, next) => {
    let { error } = blogSchema.validate(req.body);
    if (error) {
        let errMsg = error.details[0].message;
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
module.exports.validateComment = (req, res, next) => {
    let { error } = commentSchema.validate(req.body);
    if (error) {
        let errMsg = error.details[0].message;
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
module.exports.isCommentOwner = async (req, res, next) => {
    let { id, commentId } = req.params;
    let comment = await Comment.findById(commentId);
    if (!comment.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have the owner rights for this blog");
        return res.redirect(`/blogs/${id}`);
    }
    next();
};