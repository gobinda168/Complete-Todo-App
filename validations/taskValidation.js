const Joi = require("@hapi/joi");

module.exports = {
  taskValidation: data => {
    // const { taskName } = data;
    const schema = Joi.object({
      taskName: Joi.string()
        .min(6)
        .required(),
      completed: Joi.boolean()
    });
    return schema.validate(data);
  }
};
