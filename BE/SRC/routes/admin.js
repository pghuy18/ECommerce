const router = require("express").Router();

const productInfo = require("../controllers/productInfo");

const product = require("../controllers/product");
const category = require("../controllers/category");
const user = require("../controllers/user");

//Need to authenticate
router.use(require("../middlewares/auth").auth);
router.use(require("../middlewares/auth").authorization);

router.route("/product/info/:id?").get(productInfo.index1).post().put().delete();
router.route("/product/:id?").get(product.index1).post().put().delete();
router.route("/category/:id?").get(category.index1).post().put().delete();
router.route("/user/:id?").get(user.index).post().put().delete();
router.route("/dashboard").get(user.dashboard);
module.exports = router;
