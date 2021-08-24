var express = require("express");
var router = express.Router();
var axios = require("axios");

const app = require("../models/app.js");
const chalk = require("chalk");
const helper = require("../helper");
const home = require("../controllers/home");

router.get("/covid", home.covid);
router.get("/search:q?", home.search);
router.get("/detail/:id?", home.detail);
router.get("/shop/:p?", home.shop);
router.get("/aboutus/:coffee?", home.aboutus);
router.get("/error/auth", home.auth);
router.get("/error/authorize", home.authorize);
router.get("/", home.index);

module.exports = router;
