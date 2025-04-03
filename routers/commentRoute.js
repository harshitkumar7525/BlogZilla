const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateComment,isLoggedIn,isCommentOwner } = require("../utils/middleware.js");
const commentController = require("../controllers/commentController.js");

router.post("/", isLoggedIn, validateComment, wrapAsync(commentController.createNewComment));

router.delete("/:commentId", isLoggedIn, isCommentOwner, wrapAsync(commentController.destroyComment));

module.exports = router;