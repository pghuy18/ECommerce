const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    parentID: { required: true, type: String, default: null },
    categoryID: { required: true, type: String },
    categoryName: { required: true, type: String },
    subCategory: { required: false, type: [String], default: null },
}, { collection: 'category' });

module.exports = mongoose.model('category', categorySchema);