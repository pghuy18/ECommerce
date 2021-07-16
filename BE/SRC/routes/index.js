var express = require('express');
var router = express.Router();
const user = require('../models/user')
const { registerValidation, loginValidation } = require("../auth/validation");
const jwt = require("jsonwebtoken")
const verify = require('../auth/checkToken')
const bcrypt = require("bcryptjs");

router.post('/register', async(req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt)

    const newuser = new user();
    newuser.username = req.body.username
    newuser.password = hashPass

    const usernameExist = await user.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).send("username đã tồn tại")
    try {
        const User = await newuser.save()
        res.send(User);
    } catch (err) {
        console.log("Promise Rejected");
        res.status(400).send(err);
    }
})

router.post('/login', async function(req, res) {
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)
    const userLogin = await user.findOne({ username: req.body.username });
    if (!userLogin)
        return res.status(400).send("Can't find username")

    const passLogin = await bcrypt.compare(req.body.password, userLogin.password);
    if (!passLogin)
        return res.status(400).send("Wrong password")

    const token = jwt.sign({ username: userLogin.username }, process.env.SECRET_TOKEN)
    res.header("auth-token", token).send(token);
    return res.status(200).send("Success")
})

router.patch('/changepass/:username', async(req, res) => {
    try {
        const username = req.params.username;
        const update = req.body;
        const option = { new: true };

        const result = await user.findByIdAndUpdate(username, update, option);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send("Update fails");
    }
})

module.exports = router