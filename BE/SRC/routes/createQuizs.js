var express = require('express')
var router = express.Router();
const quiz = require('../models/quiz') // ==> model quiz
const ques = require('../models/question')
const user = require('../models/user') // ==> xác định ai là chủ sở hữu
router.get('/get/:name', async(req, res) => {

        try {
            const check = await quiz.findOne({ name: req.params.name });
            if (!check)
                return res.status(400).send("Quiz name does not exist");
            return res.status(200).send(check);
        } catch (error) {
            return res.status(400).send(error);
        }
    }) //=> routr for quiz OK




router.post('/createQuiz', async(req, res) => { // OK

    const newquiz = new quiz();
    newquiz.name = req.body.name;
    newquiz.category = req.body.category;
    newquiz.avatar = req.body.avatar;
    newquiz.privacy = req.body.privacy;
    newquiz.time = new Date();
    newquiz.author = req.body.author; // save id of user 

    try {
        await newquiz.save();
        res.status(200).send(newquiz); // ok 
    } catch (err) {
        res.status(400).send(err)
        console.log('cant create quiz') // bad request
    }

})

//update quiz and submit again
router.patch('/update/:_id', async(req, res) => {

    try {
        const _id = req.params._id;
        req.body.time = new Date();
        const update = req.body
        const option = { new: true };
        const result = await quiz.findOneAndUpdate(_id, update, option);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }

});

//error 404 not sevrer
router.delete('/delete/:_id', async(req, res) => {

    try {


        const option = { new: true };
        const del = await quiz.findOneAndDelete(req.params._id); // find in dtb quiz ang delete

        if (!del) return res.sendStatus(404);
        return res.send(del);
    } catch (error) {
        return res.sendStatus(400);
    }
})

router.post('/ques', async (req, res) => { // OK
const question=new ques()

question.quizID=req.body.quizID
question.question_list=req.body.question_list

try {
    const ques1 =await question.save()
    res.status(200).send(ques1)
} catch (err) {
    res.status(400).send(err)
    console.log('cant create quiz') // bad request
}
})

router.get('/list', async(req, res) => {

    try {
        const check = await ques.find();
        if (!check)
            return res.status(400).send("Quiz name does not exist");
        return res.status(200).send(check);
    } catch (error) {
        return res.status(400).send(error);
    }
}) //=> routr for quiz OK
module.exports = router;