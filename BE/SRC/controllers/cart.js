const helper = require("../helper");
module.exports.index = async (req, res) => {
  res.status(200).render("cart/index1", {
    title: "CART",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
};

module.exports.checkout = async (req, res) => {
  res.status(200).render("cart/checkout", {
    title: "CHECKOUT",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
};
