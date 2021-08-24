const router = require("express").Router();
const auth = require("../middlewares/auth");
const app = require("../models/app");
const cart = require("../controllers/cart");
//router.use(auth.auth);
router.route("/checkout").get(cart.checkout);
router.route("/").get(cart.index);
module.exports = router;
