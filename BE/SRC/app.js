const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const jwt = require("jsonwebtoken")
require('dotenv').config()
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

// Import routes
const indexUser = require("./routes/index")
const city = require("./routes/city_airport")
const { registerValidation, loginValidation } = require("./auth/validation")

const bcrypt = require("bcryptjs")

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//application/json
app.use(bodyParser.json())
app.use(cookieParser());
// Route middlewares
app.set("view engine", "ejs")
//middleware
app.use('/api/user', indexUser)
app.use('api/city', city)

app.listen(port, function() {
        console.log("Server listening port", +port)
    })

//connect to db
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(function() {
    console.log("Successfully connected to the database");
}).catch(function(err) {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});