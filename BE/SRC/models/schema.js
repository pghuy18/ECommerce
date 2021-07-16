const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: { required: true, type: String },
    password: { required: true, type: String },
<<<<<<< HEAD:BE/SRC/models/user.js
    orderList: { required: true, type: [mongoose.SchemaTypes.ObjectId] },
=======

>>>>>>> BE-fix:BE/SRC/models/schema.js
})

module.exports = mongoose.model('user', userSchema)