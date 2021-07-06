var express = require('express');
var router = express.Router();
const order = required('../models/order')
const jwt = require("jsonwebtoken")
const verify = require('../auth/checkToken')
const bcrypt = require("bcryptjs");

//api here

module.exports = router