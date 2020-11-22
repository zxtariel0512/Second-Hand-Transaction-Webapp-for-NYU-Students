const router = require('express').Router();
let Category = require('../models/category.model');

const { auth } = require("../middleware/auth");

// get all categories
router.route('/').get(async (req, res) => {
    try {
        let foundCategories = await Category.find().
        populate('parent child listings requests');
        res.json(foundCategories);
    } catch (error) {
        res.status(500).json({message: "error: get all categories"})
    }
})

// get all specific level's category
router.route('/:level').get(async(req, res) =>{
    try{
        let foundCategories = await Category.find({level: req.params.level}).
        populate('parent child requests listings');
        res.json(foundCategories);
    } catch(error){
        res.status(500).json({message: "error: get specific level's categories"})
    }
})

// get category by name
router.route('/name/:name').get(async(req, res) =>{
    try{
        let foundCategory = await Category.find({name: req.params.name}).
        populate('parent child requests listings');
        res.json(foundCategory);
    }catch(error){
        res.status(500).json({message: "error: get category by name"})
    }
})

// initialize new first level category
router.route('/new/firstCategory').post(async(req, res) =>{
    try{
        let newCategory = await Category.create(req.body);
        res.json(newCategory);
    }catch(error){
        res.status(500).json({message: "error: initialize new first category"})
    }
})

// initialize new second level category
router.route('/new/secondCategory').post(async(req, res) => {
    try{
        let parentCategory = await Category.findOne({name: req.body.parent});
        const currCategory = {
            name: req.body.name,
            level: 2,
            parent: parentCategory._id,
            listing: req.body.listing,
            request: req.body.request
        }
        let newCategory = await Category.create(currCategory);
        parentCategory.child.push(newCategory);
        await parentCategory.save();
        res.json(newCategory);
    } catch(error){
        res.status(500).json({message: "error: initialize new second category"})
    }
})


module.exports = router;