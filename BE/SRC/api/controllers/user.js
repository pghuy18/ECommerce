const app = require("../../models/app");
const helper = require("../../helper");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
module.exports.PATCH = async (req, res) => {
  if (res.locals.data) {
    try {
      let ret = await app.User.changePassword(res.locals.data);
      console.log(ret);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      console.log(chalk.red(err));
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.PROFILE = async (req, res) => {
  try {
    let token = helper.valueToken(req.signedCookies.token);
    if (token.username) {
      let ret = await app.User.getProfileByUsername(token.username);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } else return res.status(401).json(helper.stt401());
  } catch (err) {
    console.log(chalk.red("user api PROFILE"), err);
    return res.status(500).json(helper.stt500());
    return res.status(500).json(helper.stt500(err));
  }
  return res.status(400).json(helper.stt400());
};

module.exports.GETONE = async (req, res) => {
  let token = req.signedCookies.token;
  console.log(token);
};

module.exports.LOGOUT = async (req, res) => {
  let token = req.signedCookies.token || req.body.token || req.headers.authorization;
  if (token) {
    res.clearCookie("token");
    return res.status(200).json(helper.stt200());
  }
  return res.status(400).json(helper.stt400());
};

module.exports.LOGIN = async (req, res) => {
  try {
    if (res.locals.data) {
      let token = helper.createToken(res.locals.data);
      if (res.locals.data.remember) {
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
          // httpOnly: true,
          signed: true,
        });
      } else {
        res.cookie("token", token, {
          // httpOnly: true,
          signed: true,
        });
      }
      if (res.locals.data.item) {
        let ret = app.Cart.create({ token: token, item: res.locals.data.item });
      }
      let data = {
        admin: res.locals.data.role === "admin" ? true : false,
      };
      return res.status(200).json(helper.stt200(data));
    }
  } catch (err) {
    console.log(err);
  }

  return res.status(400).json(helper.stt400());
};

module.exports.DELETE = async (req, res) => {
  console.log(req.params);
  if (req.params.id) {
    try {
      let ret = await app.User.deleteByUsername(req.params.id);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      console.log(chalk.red(err));
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.PUT = async (req, res) => {
  if (res.locals.data) {
    try {
      // console.log(chalk.red("we got controller, has data"), res.locals.data);
      let ret = await app.User.updateProfile(res.locals.data);
      console.log(ret);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      //console.log(chalk.red(err));
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.POST = async (req, res) => {
  if (res.locals.data) {
    console.log(chalk.blue("has data"), res.locals.data);
    try {
      let ret = await app.User.create(res.locals.data);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.GET = async (req, res) => {
  try {
    let ret = await app.User.getAll();
    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    console.log(chalk.red("user api GET"), err);
    return res.status(500).json(helper.stt500());
    return res.status(500).json(helper.stt500(err));
  }
  return res.status(400).json(helper.stt400());
};
