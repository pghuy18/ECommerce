const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "./public/images/productInfo" });
const fs = require("fs");
const path = require("path");
const helper = require("../helper");
//middlewares
const productInfoMiddle = require("../middlewares/productInfo");
const userMiddle = require("../middlewares/user");
const auth = require("../middlewares/auth");
const categoryMiddle = require("../middlewares/category");
const productMiddle = require("../middlewares/product");
//controllers
const product = require("./controllers/product");
const productInfo = require("./controllers/productInfo");
const category = require("./controllers/category");
const user = require("./controllers/user");
const cart = require("./controllers/cart");
const order = require("./controllers/order");
//home

router.get("/vietnam", (req, res) => {
  let link = path.join(__dirname, "../data/vietnam.json");
  let rawdata = fs.readFileSync(link);
  let data = JSON.parse(rawdata);
  if (data) return res.status(200).json(helper.stt200(data));
  return res.status(400).json(helper.stt400());
});
router.get("/detail/:id?", productInfo.GET);
router.post("/search", product.SEARCH);
router.get("/page/:p?", product.PAGE);
router.post("/register", userMiddle.registerCheck, user.POST);
router.post("/login", userMiddle.loginCheck, user.LOGIN);
router.post("/logout", auth.auth, user.LOGOUT);

router.route("/order").post(order.POST);
router.get("/order/:id", order.GET);

router
  .route("/profile")
  .get(auth.auth, user.PROFILE)
  .put(auth.auth, userMiddle.profileCheck, user.PUT)
  .patch(auth.auth, userMiddle.changePasswordCheck, user.PATCH);

//cart
//router.use(auth.auth);
router
  .route("/cart/:id?")
  .get(cart.GET)
  .post(cart.POST)
  .put(cart.PUT)
  .delete(cart.DELETE);

//user manage
//router.use(auth.authorization);
router
  .route("/user/:id?")
  .get(auth.authorization, user.GET)
  .post(auth.authorization, userMiddle.registerCheck, user.POST)
  .put(auth.authorization, userMiddle.updateCheck, user.PUT)
  .patch(auth.authorization, userMiddle.changePasswordByAdmin, user.PATCH)
  .delete(user.DELETE);
//manage productInfo
router
  .route("/product/info/:id?")
  .get(productInfo.GET)
  .post(upload.single("img"), productInfoMiddle.createCheck, productInfo.POST)
  .put(upload.single("img"), productInfoMiddle.updateCheck, productInfo.PUT)
  .delete(productInfoMiddle.deleteCheck, productInfo.DELETE);

//manage product
router
  .route("/product/:id?")
  .get(product.GET)
  .post(productMiddle.createCheck, product.POST)
  .put(productMiddle.updateCheck, product.PUT)
  .delete(product.DELETE);
//manage category
router
  .route("/category/:id?")
  .get(category.GET)
  .post(categoryMiddle.createCheck, category.POST)
  .put(categoryMiddle.updateCheck, category.PUT)
  .delete(category.DELETE);

module.exports = router;
