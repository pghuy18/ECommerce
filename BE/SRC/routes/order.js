var express = require("express");
var router = express.Router();
var axios = require("axios");

const app = require("../models/app.js");
const chalk = require("chalk");
// const helper = require("../helper");
const order = require("../controllers/order");
router.get("/:id", order.index);

module.exports = router;
