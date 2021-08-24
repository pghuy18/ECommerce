const router = require("express").Router();

const user = require("../controllers/user");
const middle = require("../middlewares/user");
const auth = require("../middlewares/auth");
/* GET users listing. */

// router.route("/logout").get(user.logout).post(user.logout);
router.route("/changepassword").get(auth.auth, user.changePassword);
router.route("/profile").get(auth.auth, user.profile);

router.route("/login").get(user.login);

router.route("/register").get(user.register);

module.exports = router;
