const helper = require("../helper");
const app = require("../models/app");
module.exports.index = async (req, res, next) => {
  let ret = await app.Order.getOrderById(req.params.id);
  if (ret)
    return res.status(200).render("order/detail", {
      o: ret,
      layout: false,
      title: "Order",
      isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
    });
  return res.status(400).render("error");
};
