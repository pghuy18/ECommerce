const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: { required: true, type: String },
    password: String,
    telephone: String,
    accPoint: {type: Number, default: 0},
}, { collection: 'users'})

module.exports = mongoose.model('user', userSchema)