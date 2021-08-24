const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports.hashPassword = (usr, pwd) => {
  try {
    return crypto
      .createHash("sha256")
      .update(pwd + "@@coffee##" + usr)
      .digest("hex");
  } catch (err) {
    throw new Error(err);
  }
};
