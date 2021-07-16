const mongoose = require("mongoose")

const question = new mongoose.Schema({
   
});
const question_list = new mongoose.Schema({
    quizID: { required: true, type: String},
    question_list:[{ 
        ID: { required: true, type: String},
        type: { required: true, type: String },
        question: { required: true, type: String },
        answer: { required: true, type: [String], default: null },
        correct_answer:{required: true, type: [String]}
    }],
},{ collection: 'questions' });

module.exports = mongoose.model('question', question_list);