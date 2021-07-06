var express = require('express');
var router = express.Router();
const city = required('../models/city')
const jwt = require("jsonwebtoken")
const verify = require('../auth/checkToken')
const bcrypt = require("bcryptjs");

router.get('/airport', async(req, res) => {
    const temp = await city.findOne({
        cityID: req.body.cityID
    });
    if (!temp)
        return res.status(400).send("City ID not available");
    return res.status(200).send({
        airportList: temp.airportList
    });
})

module.exports = router