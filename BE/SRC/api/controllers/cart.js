const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const helper = require(".././../helper");
const app = require("../../models/app");

module.exports.DELETE = async (req, res) => {
  try {
    let token = req.signedCookies.token;
    if (token) {
      let o = helper.valueToken(token);
      o.token = token;
      let ret = await app.Cart.delete(o);
      if (ret) return res.status(200).json(helper.stt200(ret));
    }
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};

module.exports.PUT = async (req, res) => {
  try {
    let token = req.signedCookies.token;
    if (token) {
      if (req.body.id) {
        let cart;
        if (helper.valueToken(token).username)
          cart = await app.Cart.getByUsername(helper.valueToken(token).username, false);
        else cart = await app.Cart.getByToken(token, false);
        if (cart) {
          // console.log(cart);
          // cart.item.splice(cart.item.indexOf(req.body.id), 1);
          let temp = cart.item.filter((o) => o != req.body.id);
          cart.item = temp;
        }
        let ret = await app.Cart.update(cart);
        if (ret) return res.status(200).json(helper.stt200(ret));
      }
      return res.status(400).json(helper.stt400());
    }
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};

module.exports.POST = async (req, res) => {
  try {
    if (req.body.productId) {
      let product = await app.Product.getById(req.body.productId);
      // console.log(product.quantity);
      // console.log(req.body.productId);
      if (product && product.quantity < +req.body.quantity)
        return res.status(400).json(helper.stt400("Oversize of quantity"));

      let token = req.signedCookies.token;
      if (token) {
        let cart;
        if (helper.valueToken(token).username)
          cart = await app.Cart.getByUsername(helper.valueToken(token).username, false);
        else cart = await app.Cart.getByToken(token, false);
        let ret;
        let item = [];
        let quantity = req.body.quantity ? +req.body.quantity || 1 : 1;

        for (let i = 0; i < quantity; i++) item.push(req.body.productId);

        if (cart) {
          let t = cart.item.filter((id) => id == req.body.productId);
          console.log(t.length);

          if (
            cart.item.filter((id) => id == req.body.productId).length >
            product.quantity - quantity
          )
            return res
              .status(400)
              .json(helper.stt400("Your cart cannot has more than store's products"));

          cart.item = cart.item.concat(item);
          // cart.item.push(req.body.productId);
          ret = await app.Cart.update(cart);
        } else {
          console.log("no Cart");
          let o = {
            customer: helper.valueToken(token).username,
            token: token,
            item: item,
          };

          ret = await app.Cart.create(o);
        }
        if (ret) return res.status(200).json(helper.stt200(ret));
      }
    }
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }

  return res.status(400).json(helper.stt400());
};

module.exports.GET = async (req, res) => {
  try {
    let token = req.signedCookies.token;
    if (token) {
      let o = helper.valueToken(token);
      let ret;
      if (o.username) ret = await app.Cart.getByUsername(o.username);
      else ret = await app.Cart.getByToken(token);
      if (!ret)
        ret = await app.Cart.create({
          token: token,
          expireAt: new Date(helper.valueToken(token).exp * 1000),
        });
      // console.log(chalk.red("resuolt"), ret);
      if (ret) return res.status(200).json(helper.stt200(ret));
    }
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};
