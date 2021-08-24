const Joi = require("joi");

module.exports.update = (o) => {
  let schema = Joi.object().keys({
    id: Joi.string().hex().required(),
    price: Joi.number().positive().min(1).required(),
    quantity: Joi.number().positive().min(1).required(),
    size: Joi.number().positive().precision(1).min(0.5).required(),
    info: Joi.string().hex().required(),
  });
  return schema.validate(o);
};

module.exports.create = (o) => {
  let schema = Joi.object().keys({
    price: Joi.number().positive().min(1).required(),
    quantity: Joi.number().positive().min(1).required(),
    size: Joi.number().positive().precision(1).min(0.5).required(),
    info: Joi.string().hex().required(),
  });
  return schema.validate(o);
};
