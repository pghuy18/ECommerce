const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    _id: { required: true, type: String },
    username: { required: true, type: String },
    password: String,

}, { collection: 'users'})

module.exports = mongoose.model('user', userSchema)