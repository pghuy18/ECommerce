const Joi = require("joi");
const chalk = require("chalk");

module.exports.changePasswordByAdmin = (o) => {
  let changePassword = Joi.object().keys({
    password: Joi.string().alphanum().min(5).max(40).required(),
  });
  return changePassword.validate(o);
};

module.exports.changePassword = (o) => {
  let changePassword = Joi.object().keys({
    currentPassword: Joi.string().alphanum().min(5).max(40).required(),
    newPassword: Joi.string().alphanum().min(5).max(40).required(),
  });
  return changePassword.validate(o);
};
module.exports.profile = (o) => {
  console.log(chalk.red("profile validtae"), o);

  let profile = Joi.object().keys({
    fullName: Joi.string()
      .regex(/^(\w+( ?\w)+)$/)
      .min(7)
      .max(50)
      .uppercase()
      .required(),
    gender: Joi.boolean().required(),
    address: Joi.string()
      .regex(/^((\w+(\/? ?\w)*)( ?, ?)?\w*)*$/)
      .min(10)
      .max(120)
      .required(),
    phoneNumber: Joi.string()
      .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      .length(10),
    birthDate: Joi.string().isoDate(),
  });
  return profile.validate(o);
};
module.exports.login = (o) => {
  //console.log(o);
  let loginUser = Joi.object().keys({
    username: Joi.string()
      .regex(/^\w+(_?\w)+$/)
      .min(5)
      .max(30)
      .lowercase()
      .required(),
    password: Joi.string().min(5).max(40).required(),
    remember: Joi.boolean(),
  });
  return loginUser.validate(o);
};

module.exports.update = (o) => {
  let register = Joi.object().keys({
    fullName: Joi.string().alphanum().min(2).uppercase().required(),
    gender: Joi.boolean().default().required(),
    address: Joi.string().alphanum().required(),
  });
  return register.validate(o);
};

module.exports.create = (o) => {
  let register = Joi.object().keys({
    email: Joi.string().email().min(12).required(),
    username: Joi.string()
      .regex(/^\w+(_?\w)+$/)
      .min(5)
      .max(30)
      .lowercase()
      .required(),
    password: Joi.string().alphanum().min(5).max(40).required(),
  });
  return register.validate(o);
};
