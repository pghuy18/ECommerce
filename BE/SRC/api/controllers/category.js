const chalk = require("chalk");
const helper = require("../../helper");
const app = require("../../models/app");
module.exports.DELETE = async (req, res) => {
  if (req.params.id) {
    try {
      let ret = await app.Category.deleteById(req.params.id);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};
module.exports.PUT = async (req, res) => {
  if (res.locals.data) {
    try {
      let ret = await app.Category.update(req.body);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};
module.exports.POST = async (req, res) => {
  if (res.locals.data) {
    try {
      let ret = await app.Category.create(res.locals.data);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};
module.exports.GET = async (req, res) => {
  console.log(chalk.red("category GET"));
  try {
    let ret = req.params.id
      ? await app.Category.getById(req.params.id)
      : await app.Category.getAll();

    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500(err));
  }
  return res.status(400).json(helper.stt400());
};
