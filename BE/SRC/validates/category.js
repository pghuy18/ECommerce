const Joi = require("joi");
const chalk = require("chalk");

module.exports.update = (o) => {
  let schema = Joi.object().keys({
    id: Joi.string().hex().required(),
    name: Joi.string()
      .regex(/^((\w+( ?\w)*)(, ?)?\w*)+$/)
      .min(3)
      .max(50)
      .required()
      .uppercase(),
  });
  return schema.validate(o);
};

module.exports.create = (o) => {
  let schema = Joi.object().keys({
    name: Joi.string()
      .regex(/^((\w+( ?\w)*)(, ?)?\w*)+$/)
      .min(3)
      .max(50)
      .required()
      .uppercase(),
  });
  return schema.validate(o);
};
