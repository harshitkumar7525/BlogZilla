const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateBlog } = require("../utils/middleware.js");
const blogController = require('../controllers/blogController.js');
const multer = require('multer')
const { storage } = require("../utils/CloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(blogController.homePage))
    .post(isLoggedIn, upload.single('blog[image]'), validateBlog, wrapAsync(blogController.createBlog));

router.get("/new", isLoggedIn, blogController.renderNewForm);

router.get("/:id", wrapAsync(blogController.showBlog));

router.route("/:id/edit")
    .get(isLoggedIn, isOwner, wrapAsync(blogController.renderEditForm))
    .put(isLoggedIn, isOwner, upload.single('blog[image]'), validateBlog, wrapAsync(blogController.editBlog));

router.delete("/:id/delete", isLoggedIn, isOwner, wrapAsync(blogController.destroyBlog));

module.exports = router;