var express = require('express');
var router = express.Router();
const user = require("../models/user")
const {order, flight, airline, airplane, passenger, city, airport, luggage, service, shuttle, planeclass} = require('../models/order')
const jwt = require("jsonwebtoken")
const verify = require('../auth/checkToken')
const bcrypt = require("bcryptjs");

router.patch('/flight/:id', (req,res) => {
    try {
        const update = req.body;
        const option = { new: true };

        const result = await flight.findOneAndUpdate({_id: req.params.id}, update, option);
        if (result)
            return res.status(200).send(result);
        return res.status(404).send("Flight does not exist");
    } catch (error) {
        return res.status(400).send(error);
    }
})

router.patch('/order/:id', (req,res) =>{
    try {
        const update = req.body;
        const option = { new: true };

        const result = await order.findOneAndUpdate({_id: req.params.id}, update, option);
        if (result) {
            const User = await user.findOne({ _id: result.userID });
            User.accPoint += 0.1*result.price;
            const tmp = await User.save();
            return res.status(200).send(result);
        }
        return res.status(404).send("Order does not exist");
    } catch (error) {
        return res.status(400).send(error);
    }
})

module.exports = router