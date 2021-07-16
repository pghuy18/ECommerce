const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    name: { required: true, type: String },
    username: { required: true, type: String },
    email: { required: true, type: String, default: null },
    password: String,
    type: { required: true, type: String },
    birthyear: { required: true, type: Date },
    uid: String,
    token: String,
    gender: String,
    avatar: { required: true, type: String, default: 'imgur.com/0RLOAYw'}

}, { collection: 'users'})

module.exports = mongoose.model('user', userSchema)