const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3333;
const jwt = require("jsonwebtoken")
require('dotenv').config()
var mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
    //facebook

const session = require('express-session');

// Import routes
const indexUser = require("./routes/index")
const input = require("./routes/input")
const edit = require("./routes/edit")


const { registerValidation, loginValidation } = require("./auth/validation")
const bcrypt = require("bcryptjs")
    // Gửi yêu cầu phân tích kiểu nội dung application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Gửi yêu cầu phân tích kiểu nội dung application/json
app.use(bodyParser.json())
app.use(cookieParser());
// Route middlewares
app.set("view engine", "ejs")
app.use(cors())

//middleware
app.use('/api/user', indexUser)
app.use('/api/input', input)
app.use('/api/edit', edit)


// Lắng nghe các requests
app.listen(process.env.PORT || 3333, function() {
    console.log("Server listening port", +port)
})
//ghi db

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(function() {
    console.log("Successfully connected to the database");
}).catch(function(err) {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});