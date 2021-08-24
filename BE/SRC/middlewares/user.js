const helper = require("../helper");
const app = require("../models/app");
const validate = require("../validates/user");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");

module.exports.changePasswordByAdmin = async (req, res, next) => {
  //check existing
  try {
    let valid = validate.login(req.body);
    if (valid.error) {
      if (valid.error.details[0].message.indexOf("pattern") <= -1)
        return res.status(400).json(helper.stt400(valid.error.details[0].message));
      return res
        .status(400)
        .json(
          helper.stt400(
            `"username" should include characters [A-Z], [a-z], "_", [0-9], start and end with a character`
          )
        );
    }
    let ret = await app.User.getByUsername(valid.value.username);
    //not found
    if (!ret)
      return res.status(400).json(helper.stt400(`"${valid.value.username}" not found`));

    res.locals.data = {
      id: ret._id,
      password: helper.hashPassword(ret.username, valid.value.password),
    };
    return next();

    //not existing
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500(err));
  }
};

module.exports.changePasswordCheck = async (req, res, next) => {
  try {
    console.log(chalk.blue("we got middle profile"), req.body);
    // console.log(req.body);
    let token = helper.valueToken(req.signedCookies.token);
    if (token.username) {
      let ret = await app.User.getByUsername(token.username);
      if (ret) {
        let valid = validate.changePassword(req.body);
        // console.log(helper.hashPassword(valid.value.currentPassword));
        if (valid.error)
          return res.status(400).json(helper.stt400(valid.error.details[0].message));
        if (valid.value.currentPassword === valid.value.newPassword)
          return res
            .status(400)
            .json(
              helper.stt400(
                `The "current password" need to be different the "new password"`
              )
            );
        if (
          helper.hashPassword(ret.username, valid.value.currentPassword) !== ret.password
        )
          return res.status(400).json(helper.stt400(`Incorrect password`));
        //correct password
        res.locals.data = {
          id: ret._id,
          password: helper.hashPassword(ret.username, valid.value.newPassword),
        };
        return next();
      }
    }
    return res.status(401).json(helper.stt401());
  } catch (err) {
    console.log("user update middle", err);
    return res.status(500).json(helper.stt500());
  }
};
module.exports.profileCheck = async (req, res, next) => {
  try {
    // console.log(chalk.blue("we got middle profile"));
    // console.log(req.body);
    let token = helper.valueToken(req.signedCookies.token);
    if (token.username) {
      let ret = await app.User.getByUsername(token.username);
      if (ret) {
        let valid = validate.profile(req.body);
        if (valid.error) {
          console.log(chalk.red("valid error"), valid.error);
          return res.status(400).json(helper.stt400(valid.error.details[0].message));
        } else {
          res.locals.data = {
            id: ret._id,
            profile: valid.value,
          };

          return next();
        }
      }
    }
    return res.status(401).json(helper.stt401());
  } catch (err) {
    console.log("user update middle", err);
    return res.status(500).json(helper.stt500());
  }
};

module.exports.loginCheck = async (req, res, next) => {
  //validtate
  // console.log(req.body);

  let valid = validate.login(req.body);
  if (valid.error) {
    if (valid.error.details[0].message.indexOf("pattern") <= -1)
      return res.status(400).json(helper.stt400(valid.error.details[0].message));
    return res
      .status(400)
      .json(
        helper.stt400(
          `"username" should include characters [A-Z], [a-z], "_", [0-9], start and end with a character`
        )
      );
  }

  //check existing
  try {
    let ret = await app.User.getByUsername(valid.value.username);
    //not found
    if (!ret)
      return res.status(400).json(helper.stt400(`"${valid.value.username}" not found`));
    else {
      //existing 1 // feature  more in someday
      valid.value.password = helper.hashPassword(
        valid.value.username,
        valid.value.password
      );
      //check password
      if (valid.value.password === ret.password) {
        // console.log(valid.value);
        res.locals.data = {
          username: ret.username,
          role: ret.role,
          remember: valid.value.remember,
        };
        if (req.signedCookies.token) {
          let cart = await app.Cart.getByToken(req.signedCookies.token);
          if (cart && cart.item.length > 0) {
            res.locals.data.item = cart.item;
            await app.Cart.removeOne(req.signedCookies.token);
          }
        }
        return next();
      }
      return res.status(400).json(helper.stt400("Password Incorrect"));
    }
    //not existing
  } catch (err) {
    console.log(err);
    return res.status(500).json(helper.stt500(err));
  }
};

module.exports.updateCheck = async (req, res, next) => {
  try {
    //check token get username
    let token = helper.valueToken(req.signedCookies.token);
    if (token.username) {
      let ret = await app.User.getByUsername(token.username);
      if (ret) {
        let valid = validate.profile(req.body);
        if (valid.error) {
          return res.status(400).json(helper.stt400(valid.error.details[0].message));
        }
        return next();
      }
    }

    return res.status(400).json(helper.stt400(`${valid.value.username} not existing`));
  } catch (err) {
    console.log("user update middle", err);
    return res.status(500).json(helper.stt500());
  }
};

module.exports.registerCheck = async (req, res, next) => {
  //validate
  console.log(chalk.blue("req body"), req.body);
  let valid = validate.create(req.body);
  if (valid.error) {
    if (valid.error.details[0].message.indexOf("pattern") <= -1)
      return res.status(400).json(helper.stt400(valid.error.details[0].message));
    return res
      .status(400)
      .json(
        helper.stt400(
          `"username" should include characters [A-Z], [a-z], "_", [0-9], start and end with a character`
        )
      );
  }
  // check existing
  try {
    let ret = await app.User.getByUsernameOrEmail(valid.value);
    if (ret) {
      for (let i in ret) {
        if (ret[i].username == valid.value.username)
          return res
            .status(400)
            .json(helper.stt400(`"${ret[i].username}" already exists`));
        if (ret[i].email == valid.value.email)
          return res.status(400).json(helper.stt400(`"${ret[i].email}" already exists`));
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(helper.stt500());
  }

  //next();
  valid.value.password = helper.hashPassword(valid.value.username, valid.value.password);
  //format value
  res.locals.data = valid.value;
  return next();
};
