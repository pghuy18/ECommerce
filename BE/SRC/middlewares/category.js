const validate = require("../validates/category");
const chalk = require("chalk");
const helper = require("../helper");
const app = require("../models/app");
module.exports.updateCheck = async (req, res, next) => {
  let valid = validate.update(req.body);

  if (valid.error) {
    if (valid.error.details[0].message.indexOf("pattern") <= -1)
      return res.status(400).json(helper.stt400(valid.error.details[0].message));
    return res
      .status(400)
      .json(
        helper.stt400(
          `"name" should include characters [A-Z], [a-z], " ", [0-9], start and end with a character`
        )
      );
  }
  let ret = await app.Category.getById(valid.value.id);
  if (!ret)
    return res
      .status(400)
      .json(helper.stt400(`category with id "${valid.value.id}" not found`));
  res.locals.data = valid.value;

  return next();
};

module.exports.createCheck = async (req, res, next) => {
  let valid = validate.create(req.body);
  console.log(req.body);
  console.log(valid);
  if (valid.error) {
    if (valid.error.details[0].message.indexOf("pattern") <= -1)
      return res.status(400).json(helper.stt400(valid.error.details[0].message));
    return res
      .status(400)
      .json(
        helper.stt400(
          `"name" should include characters [A-Z], [a-z], " ", [0-9], start and end with a character`
        )
      );
  }

  res.locals.data = valid.value;

  return next();
};
