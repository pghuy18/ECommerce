const app = require("../../models/app");
const helper = require("../../helper");
const chalk = require("chalk");

module.exports.POST = async (req, res) => {
  try {
    let token = helper.valueToken(req.signedCookies.token);
    let o = Object.assign({}, req.body);
    console.log(req.body);
    // let cartId = req.body.cartId;
    if (token.username) {
      o.username = token.username;
    }
    let ret = await app.Order.createOrder(o, req.body.cartId);
    if (ret) {
      return res.status(200).json(helper.stt200(ret));
    }
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};

module.exports.GET = async (req, res) => {
  try {
    console.log(req.params);
    let id = req.params.id;
    let ret = await app.Order.getOrderById(id);
    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};
