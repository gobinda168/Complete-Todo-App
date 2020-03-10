const Joi = require("@hapi/joi");

//Registration Validation

const registerValidation = data => {
  const registerSchema = Joi.object({
    name: Joi.string()
      .min(6)
      .max(120)
      .required(),
    email: Joi.string()
      .email()
      .required()
      .min(10),
    password: Joi.string()
      .min(6)
      .required()
  });
  return registerSchema.validate(data);
};
const loginValidation = data => {
  const loginSchema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .min(10),
    password: Joi.string()
      .min(6)
      .required()
  });
  return loginSchema.validate(data);
};

module.exports = { registerValidation, loginValidation };
