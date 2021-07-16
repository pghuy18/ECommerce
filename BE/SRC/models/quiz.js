const mongoose = require("mongoose")

const quizSchema = mongoose.Schema({

    name: { required: true, type: String },
    category: String,
    avatar: String,
    privacy: { require: true, type: String },
    author: String,
    time: Date
}, { collection: 'quizs' });

module.exports = mongoose.model('quiz', quizSchema) // schema for quiz