const router = require('express').Router();
let request = require('../models/request.model');

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
router.route('/:id').get(async (req, res) => {
    try {
        let foundrequest = await request.findById(req.params.id);
        res.json(foundrequest);

    } catch (error) {
        res.status(500).json({message: "error: get specific request"})
    }

})

// Create a new request
router.route('/new').post(auth, async (req, res) => {
    try {
        let newrequest = await request.create(req.body);
        res.json(newrequest)
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
        res.json(deletedrequest);

    } catch (error) {
        res.status(500).json({message: "error: delete request"})
    }

})

module.exports = router;