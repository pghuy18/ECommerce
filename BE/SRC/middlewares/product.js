const validate = require("../validates/product");
const chalk = require("chalk");
const helper = require("../helper");
const app = require("../models/app");
module.exports.updateCheck = async (req, res, next) => {
  let valid = validate.update(req.body);
  // console.log(req.body);
  if (valid.error)
    return res.status(400).json(helper.stt400(valid.error.details[0].message));
  let ret = await app.Product.getById(valid.value.id);
  if (!ret)
    return res
      .status(400)
      .json(helper.stt400(`product with id "${valid.value.id}" not found`));
  res.locals.data = valid.value;

  return next();
};

module.exports.createCheck = async (req, res, next) => {
  console.log(chalk.blue("product middle"), req.body);
  let valid = validate.create(req.body);

  if (valid.error) {
    return res.status(400).json(helper.stt400(valid.error.details[0].message));
  }
  let ret = await app.ProductInfo.getById(valid.value.info);
  if (!ret)
    return res
      .status(400)
      .json(helper.stt400(`info with id "${valid.value.info}" not exist`));
  res.locals.data = valid.value;

  return next();
};
