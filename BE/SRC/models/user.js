const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: { required: true, type: String },
    password: { required: true, type: String },
    orderList: { required: true, type: [mongoose.SchemaTypes.ObjectId] },
})

module.exports = mongoose.model('user', userSchema)