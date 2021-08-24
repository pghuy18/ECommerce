const app = require("../models/app.js");
const chalk = require("chalk");
const helper = require("../helper");
const { default: axios } = require("axios");
//const ml = require("path").join(__dirname, "models");

module.exports.covid = async (req, res) => {
  // axios.get("http://168.63.133.155/api/Covid/GetCityList").then((as) => {
  //   console.log(as.data);
  // });
  return res.status(200).render("home/infomation", {
    layout: false,
    title: "Covid",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
};

module.exports.search = async (req, res, next) => {
  if (req.query.q) {
    try {
      let total = await app.Product.getSearchCount(req.query.q);
      let ret = await app.Product.getSearchByName(req.query.q);
      // console.log("home search", ret);
      if (ret)
        return res.status(200).render("home/shop1", {
          a: ret,
          title: "Express",
          q: req.query.q,
          loadmore: true,
          // loadmore: total > ret.length ? true : false,
          isAuthenticated: helper.valueToken(req.signedCookies.token).username
            ? true
            : false,
        });
      return res.status(200).render("home/shop1", {
        message: `No Products was found with "${req.query.q}"`,
        title: "Express",
        q: req.query.q,
        isAuthenticated: helper.valueToken(req.signedCookies.token).username
          ? true
          : false,
      });
    } catch (err) {
      return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
    }
  }
  return res.status(200).render("home/shop1", {
    message: `You should input product name.Example : "coffee"`,
    title: "Express",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
};
module.exports.detail = async (req, res, next) => {
  try {
    let ret = await app.Product.getById(req.params.id);

    if (ret)
      return res.status(200).render("home/detail", {
        o: ret,
        title: "DETAIL",
        isAuthenticated: helper.valueToken(req.signedCookies.token).username
          ? true
          : false,
      });
    return res.status(400).render("error", { layout: false, message: "BAD NET WORK" });
  } catch (err) {
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }
};

module.exports.shop = async (req, res, next) => {
  try {
    let p = req.params.p || 1;
    let size = 20;
    let ret = await app.Product.getPage(p, size);
    // console.log(chalk.blue("get result"), ret);
    let total = await app.Product.count();
    let n = Math.ceil(total / size) || 1;
    if (total > 0)
      return res.status(200).render("home/shop1", {
        // a: ret,
        p: p,
        n: n,
        title: "Home",
        isAuthenticated: helper.valueToken(req.signedCookies.token).username
          ? true
          : false,
      });
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }
  return res.status(400).render("error", { layout: false, message: "BAD NETWORK" });
};

module.exports.index = async (req, res) => {
  if (!req.signedCookies.token) {
    let token = helper.createToken();
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 2,
      // httpOnly: true,
      signed: true,
    });
  }
  return res.status(200).render("home/index", {
    title: "Home",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
};
module.exports.aboutus = (req, res) => {
  let coffee = req.params.coffee || "index";
  return res.status(200).render(`aboutus/${coffee}`, {
    title: coffee == "index" ? "ABOUT US" : `${coffee.toUpperCase()} Coffee`,
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
    layout: coffee == "index" ? "main" : false,
  });
};

module.exports.auth = (req, res) => {
  return res.status(200).render("error/auth", { title: "AUTH ERROR", layout: false });
};
module.exports.authorize = (req, res) => {
  return res
    .status(200)
    .render("error/authorize", { title: "DENIED ACCESS", layout: false });
};
