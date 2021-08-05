var express = require('express');
var router = express.Router();
const user = require('../models/user') // ==>12
    /* GET users listing. */
const { registerValidation, loginValidation } = require("../auth/validation");
const jwt = require("jsonwebtoken")
const verify = require('../auth/checkToken')
const bcrypt = require("bcryptjs");

router.post('/register', async(req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt)

    // Tạo user
    const newuser = new user();
    newuser.username = req.body.username
    newuser.password = hashPass

    const usernameExist = await user.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).send("username not available")

    else
        try {
            const User = await newuser.save()
            console.log("Save on dtb successfull");
            return res.status(200).send(User);
        } catch (err) {
            console.log("Promise Rejected");
            return res.status(400).send(err);
        }
})

router.post('/login', async function(req, res) {
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)
    const userLogin = await user.findOne({ username: req.body.username });
    if (!userLogin)
        return res.status(400).send("Cant find username")

    // Kiểm tra password
    const passLogin = await bcrypt.compare(req.body.password, userLogin.password);
    if (!passLogin)
        return res.status(400).send("Password not correct")

    // Tạo token 
    const token = jwt.sign({ _id: userLogin._id }, process.env.SECRET_TOKEN)
    return res.status(200).header("auth-token", token).send(token);
})

router.get('/:username', async (req, res) => {
    try {
        const User = await user.findOne({username: req.params.username});
        if (!User)
            return res.status(404).send("User not found");
        return res.status(200).send(User);
    } catch (err) {
        return res.status(400).send(err)
    }
})

module.exports = router