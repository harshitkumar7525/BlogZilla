const Blog = require('../models/blog.js');

module.exports.homePage = async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("./blogs/index.ejs", { allBlogs });
};
module.exports.renderNewForm = (req, res) => {
    res.render("./blogs/new.ejs");
};
module.exports.showBlog = async (req, res) => {
    let blog = await Blog.findById(req.params.id)
        .populate({
            path: "comments",
            populate: {
                path: "owner"
            }
        })
        .populate("owner");
    console.dir(blog);
    if (!blog) {
        req.flash("error", "Requested Blog cannot be found");
        res.redirect("/blogs");
    }
    res.render("./blogs/show.ejs", { blog });
};
module.exports.createBlog = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newBlog = new Blog(req.body.blog);
    newBlog.owner = req.user._id;
    newBlog.image = { url, filename };
    await newBlog.save();
    req.flash("success", "New Blog added successfully!");
    res.redirect("/blogs");
};
module.exports.renderEditForm = async (req, res) => {
    let blog = await Blog.findById(req.params.id)
    let OriginalUrl = listing.image.url;
    OriginalUrl = OriginalUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("./blogs/edit.ejs", { listing, OriginalUrl });
};
module.exports.editBlog = async (req, res) => {
    let blog = await Blog.findByIdAndUpdate(req.params.id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        blog.image = { url, filename };
        await blog.save()
    }
    req.flash("success", "Blog edited successfully!");
    res.redirect(`/blogs/${req.params.id}`);
};
module.exports.destroyBlog = async (req, res) => {
    let result = await Blog.findByIdAndDelete(req.params.id, { new: true })
    console.log(result);
    req.flash("success", "Blog deleted successfully!");
    res.redirect("/");
};