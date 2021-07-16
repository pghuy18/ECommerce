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
    newuser.name = req.body.name
    newuser.email = req.body.email
    newuser.username = req.body.username
    newuser.birthyear = req.body.birthyear
    newuser.type = req.body.type
    newuser.password = hashPass


    const usernameExist = await user.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).send("username đã tồn tại")
    const emailExist = await user.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("email đã tồn tại")

    else
        try {
            const User = await newuser.save()
            console.log("Save on dtb successfull");
            return res.send(User);
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
        return res.status(400).send("Không tìm thấy username")

    // Kiểm tra password
    const passLogin = await bcrypt.compare(req.body.password, userLogin.password);
    if (!passLogin)
        return res.status(400).send("Mật khẩu không đúng")

    // Tạo token 
    const token = jwt.sign({ _id: userLogin._id }, process.env.SECRET_TOKEN)
    return res.status(200).header("auth-token", token).send(token);
})

router.get('/profile/:username', async(req, res) => {
    const profile = await user.findOne({
        username: req.params.username

    });

    if (!profile)
        return res.status(400).send("Không tìm thấy người dùng");
    return res.status(200).send({
        email: profile.email,
        name: profile.name,
        avatar: profile.avatar,
        username: profile.username,
        birthyear: profile.birthyear,
        type: profile.type
    });
})

router.patch('/profile/update/:username', async(req, res) => {
    try {
        const username = req.params.username;
        const update = req.body;
        const option = { new: true };

        const result = await user.findByIdAndUpdate(username, update, option);
        if (result)
            res.status(200).send(result);
        return res.status(400).send("Username does not exist");
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router