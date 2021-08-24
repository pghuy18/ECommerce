const validate = require("../validates/productInfo");
const helper = require("../helper");
const app = require("../models/app");
const chalk = require("chalk");

module.exports.deleteCheck = async (req, res, next) => {
  //console.log(req.params);
  let ret = await app.ProductInfo.getById(req.params.id);
  if (ret) {
    if (ret.imgUrl != "default") {
      try {
        helper.deleteFile(`/images/productInfo/${ret.imgUrl}`);
      } catch (err) {
        return res.status(400).json(helper.stt400("Image not found"));
      }
    }
    return next();
  }
};

module.exports.updateCheck = async (req, res, next) => {
  //validate
  let valid = validate.update(req.body);
  if (valid.error) {
    if (valid.error.details[0].message.indexOf("pattern") <= -1)
      return res.status(400).json(helper.stt400(valid.error.details[0].message));
    return res
      .status(400)
      .json(
        helper.stt400(
          `${
            valid.error.details[0].message.indexOf("subname") === 1
              ? `"subname"`
              : `"name"`
          } should include characters [A-Z], [a-z], " ", [0-9], start and end with a character`
        )
      );
  }
  let ret = await app.ProductInfo.getByName(valid.value.name);
  // console.log(valid.value.name);
  // console.log(ret);
  if (ret) {
    if (ret.name == valid.value.name)
      if (ret._id != valid.value.id)
        return res
          .status(500)
          .json(helper.stt500(`"${valid.value.name}" exists, DUPLICATE ERROR`));
  }
  //more than 2 cateogories
  if (valid.value.category.includes(",")) {
    valid.value.category = valid.value.category.split(",");
  }
  if (req.file) {
    if (valid.value.imgUrl != "default") {
      //delete old img

      helper.deleteFile(`/images/productInfo/${valid.value.imgUrl}`);
    }
    valid.value.imgUrl = req.file.filename;
  }
  res.locals.data = valid.value;

  return next();
};

module.exports.createCheck = async function (req, res, next) {
  let valid = validate.create(req.body);

  if (valid.error) {
    if (valid.error.details[0].message.indexOf("pattern") <= -1)
      return res.status(400).json(helper.stt400(valid.error.details[0].message));
    return res
      .status(400)
      .json(
        helper.stt400(
          `${
            valid.error.details[0].message.indexOf("subname") === 1
              ? `"subname"`
              : `"name"`
          } should include characters [A-Z], [a-z], " ", [0-9], start and end with a character`
        )
      );
  }
  let ret = await app.ProductInfo.getByName(valid.value.name);
  // console.log(valid.value.name);
  // console.log(ret);
  if (ret)
    return res
      .status(500)
      .json(helper.stt500(`"${valid.value.name}" exists, DUPLICATE ERROR`));

  if (valid.value.category.includes(",")) {
    //more than 2 cateogories
    valid.value.category = valid.value.category.split(",");
  }

  res.locals.data = valid.value;
  if (req.file) {
    res.locals.data.imgUrl = req.file.filename;
  }

  return next();
};
