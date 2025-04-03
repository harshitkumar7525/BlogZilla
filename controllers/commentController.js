const Comment = require('../models/comment.js');
const Blog = require('../models/blog.js');

module.exports.createNewComment = async (req, res) => {
    let blog = await Blog.findById(req.params.id);
    let newComment = new Comment(req.body.comment);
    newComment.name = req.user.username;
    blog.reviews.push(newComment);
    newComment.owner = req.user._id;
    await newComment.save();
    await blog.save();
    req.flash("success", "New comment added successfully!");
    res.redirect(`/blogs/${req.params.id}`)
};

module.exports.destroyComment = async (req, res) => {
    let { id, commentId } = req.params;
    await Blog.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash("success", "Comment deleted successfully!");
    res.redirect(`/blogs/${id}`);
};