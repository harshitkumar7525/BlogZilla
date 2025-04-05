const joi = require("joi");
module.exports.blogSchema = joi.object({
  blog: joi
    .object({
      title: joi.string().required(),
      content: joi.string().required(),
      img: joi
        .object({
          url: joi.string().required(),
          filename: joi.string().required(),
        })
        .optional(),
      owner: joi.string().required(),
      created_at: joi.date().required(),
      isEdited: joi.boolean().optional(),
      likes: joi.array().items(joi.string()).optional(),
      comments: joi.array().items(joi.string()).optional(),
    })
    .required(),
});
module.exports.commentSchema = joi.object({
  comment: joi
    .object({
      content: joi.string().required(),
      owner: joi.string().required(),
      created_at: joi.date().required(),
    })
    .optional(),
});