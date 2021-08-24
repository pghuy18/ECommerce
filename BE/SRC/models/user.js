const User = require("./model").User;
const chalk = require("chalk");
const helper = require("../helper");

module.exports.changePassword = async (o) => {
  try {
    o.updatedAt = new Date();
    let ret = await User.findByIdAndUpdate(
      o.id,
      { $set: { password: o.password } },
      { new: true }
    );
    return ret;
  } catch (err) {
    console.log("user MODEL-changePassword", err);
    throw new Error(err);
  }
};

module.exports.getProfileByUsername = async (usr) => {
  try {
    let select = ["-password", "-role", "-_id"];
    let ret = await User.findOne({ username: usr }).select(select);
    return ret;
  } catch (err) {
    console.log("user MODEL-getUserByUsername", err);
    throw new Error(err);
  }
};

module.exports.deleteByUsername = async (usr) => {
  try {
    let ret = await User.findOneAndDelete({ username: usr }).select({ username: 1 });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.deleteById = async (id) => {
  try {
    let ret = await User.findByIdAndRemove(id).select({ username: 1 });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.updateProfile = async (o) => {
  try {
    o.updatedAt = new Date();
    let ret = await User.findByIdAndUpdate(
      o.id,
      { $set: { profile: o.profile } },
      { new: true }
    );
    return ret;
  } catch (err) {
    //console.log(chalk.red(err));
    throw new Error(err);
  }
};
module.exports.create = async (o) => {
  //console.log("USER MODEL --- create1", o);
  try {
    let newUser = new User(o);
    //console.log("newUser", newUser);
    return newUser.save();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getByUsername = async (usr) => {
  try {
    let ret = await User.findOne({ username: usr });
    //console.log("user MODEL-getUserByUsername", ret);
    return ret;
  } catch (err) {
    console.log("user MODEL-getUserByUsername", err);
    throw new Error(err);
  }
};

module.exports.getAll = async () => {
  try {
    let ret = await User.find().sort({ updatedAt: -1 });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports.getByUsernameOrEmail = async (o) => {
  console.log("o here", o);
  //return User.find({ $or: [{ email: o.email }, { userName: o.userName }] });
  try {
    // let ret = await User.find
    //   .or([{ email: o.email.toLowerCase() }, { usename: o.username.toLowerCase() }])
    //   .select(["username", "email", "password"]);
    let ret = await User.find({
      $or: [{ email: o.email.toLowerCase() }, { username: o.username.toLowerCase() }],
    }).select(["username", "email", "password"]);
    console.log("email or username", ret);
    return ret;
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(err);
  }
};
