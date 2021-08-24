const app = require("../models/app");
const helper = require("../helper");
module.exports.detail = (req, res) => {
  try {
    let ret = app.ProductInfo.getById(req.params.id);
    if (ret)
      return res.status(200).render("productInfo/detail", { o: val, title: "DETAIL" });
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};
module.exports.index1 = (req, res) => {
  console.log("index1");
  return res.status(200).render("productInfo/index1", {
    title: "PRODUCT-A",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
  // return res.render("productInfo/index", { title: "PRODUCT INFO" });
};
module.exports.index = (req, res) => {
  return res.status(200).render("productInfo/index", {
    title: "PRODUCT-ADMIN",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
  // return res.render("productInfo/index", { title: "PRODUCT INFO" });
};
