var express = require('express');
var router = express.Router();
const user = require('../models/schema') // ==>12
    /* GET users listing. */
const { registerValidation, loginValidation } = require("../auth/validation");
const jwt = require("jsonwebtoken")

const verify = require('../auth/checkToken')

const bcrypt = require("bcryptjs");


// router.get('/', verify, function(req, res) {
//     res.send("trang goc cua api/user/")
// })

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

    // Kiểm tra password
    const passLogin = await bcrypt.compare(req.body.password, userLogin.password);
    if (!passLogin)
        return res.status(400).send("Wrong password")

    // Tạo token 
    const token = jwt.sign({ username: userLogin.username }, process.env.SECRET_TOKEN)
    res.header("auth-token", token).send(token);
    return res.status(200).send("Success")

})

module.exports = router