const Joi = require("joi");

const registerValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(3).required(),
  fullName: Joi.string().min(3).required(),
  avatarUrl: Joi.string(),
});

const loginValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(3).required(),
});

const postCreatValidator = Joi.object({
  title: Joi.string().min(3).required(),
  text: Joi.string().min(3).required(),
  tags: Joi.string(),
  imageUrl: Joi.string(),
});

module.exports = {
  registerValidator,
  loginValidator,
  postCreatValidator,
};
