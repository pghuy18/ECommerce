var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
const category = require('../models/category')

router.post('/create', async(req, res) => {
    try {
        const check = await category.findOne({ categoryName: req.body.categoryName });
        if (check)
            return res.status(400).send("Category name is already used");
        const temp = new category();
        if (req.body.parentID != null)
            temp.parentID = req.body.parentID;
        if (req.body.subCategory != null)
            temp.subCategory = req.body.subCategory;
        temp.categoryName = req.body.categoryName;
        temp.categoryID = req.body.categoryID;
        const tmp = await temp.save();
        return res.status(200).send(tmp);
    } catch (err) {
        return res.status(400).send(err);
    }
});

router.patch('/edit/:categoryName', async(req,res) => {
    try {
        const categoryName = req.params.categoryName;
        const update = req.body;
        const option = { new: true };

        const result = await user.findByIdAndUpdate(categoryName, update, option);
        if (result)
            return res.status(200).send("Success");
        return res.status(400).send("Category does not exist");
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get('/get/:categoryName', async(req, res) => {
    try {
        const check = await category.findOne({ categoryName: req.params.categoryName });
        if (!check)
            return res.status(400).send("Category name does not exist");
        return res.status(200).send(check);
    } catch (error)
    {
        return res.status(400).send(error);
    }
})

module.exports = router