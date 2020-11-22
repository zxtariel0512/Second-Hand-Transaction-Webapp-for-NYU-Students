const router = require('express').Router();
let request = require('../models/request.model');
let Category = require('../models/category.model');

const { auth } = require("../middleware/auth");

// Get a list of all of the requests
router.route('/').get(async (req, res) => {
    try {
        let foundrequests = await request.find();
        res.json(foundrequests);
    } catch (error) {
        res.status(500).json({message: "error: get all request"})
    }

})

// Get an individual request
router.route('/:netid').get(async (req, res) => {
    try {
        let foundrequest = await request.findOne({netid: req.params.netid});
        res.json(foundrequest);

    } catch (error) {
        res.status(500).json({message: "error: get specific request"})
    }

})

// Create a new request
router.route('/new').post(auth, async (req, res) => {
    try {
        let currCategory = await Category.findOne({name: req.body.category});
        const R = {
            user_id: req.body.user_id,
            status: req.body.status,
            title: req.body.title,
            category: currCategory._id,
            description: req.body.description, cover_image_url: req.body.cover_image_url, detail_image_urls: req.body.detail_image_urls, original_price: req.body.original_price, current_price: req.body.current_price, created_date: req.body.created_date, expire_date: req.body.expire_date, payment: req.body.payment, shipment: req.body.shipment
        }
        let newRequest = await request.create(R);
        currCategory.requests.push(newRequest);
        await currCategory.save();
        res.json(newRequest)
    } catch (error) {
        res.status(500).json({message: "error: create new request"})
    }

})

// Update an individual request
router.route('/:id').put(auth, async (req, res) => {
    try {
        let updatedrequest = await request.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedrequest);
    } catch (error) {
        res.status(500).json({message: "error: update request"})
    }

})

// Delete an individual request
router.route('/:id').delete(auth, async (req, res) => {
    try {
        let deletedrequest = await request.findByIdAndDelete(req.params.id);
        let currCategory = await Category.findById(deletedrequest.category);
        const index = currCategory.requests.indexOf(deletedrequest);
        currCategory.requests.splice(index, 1);
        await currCategory.save();
        res.json(deletedrequest);

    } catch (error) {
        res.status(500).json({message: "error: delete request"})
    }

})

module.exports = router;