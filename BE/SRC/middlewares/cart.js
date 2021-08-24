const jwt = require("jsonwebtoken");
const helper = require("../helper");
module.exports.checkToken = async (req, res, next) => {
  if (req.signedCookies.token) {
    return next();
  } else {
    return res.status(400).json(helper.stt400("Need to login"));
    // let token = jwt.sign(payload, process.env.TOKEN_SECRECT, {
    //   expiresIn: `${1000 * 60 * 10}`,
    // });

    // res.cookie("token", token, {
    //   maxAge: 1000 * 60 * 10,
    //   httpOnly: true,
    //   signed: true,
    // });
  }
};
