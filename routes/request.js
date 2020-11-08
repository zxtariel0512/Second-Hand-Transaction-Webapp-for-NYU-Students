const router = require('express').Router();
let request = require('../models/request.model');

const { auth } = require("../middleware/auth");

router.route('/').get(async (req, res) => {
    let foundrequests = await request.find();
    res.json(foundrequests);
})

router.route('/:id').get(async (req, res) => {
    let foundrequest = await request.findById(req.params.id);
    res.json(foundrequest);
})

router.route('/new').post(auth, async (req, res) => {
    let newrequest = await request.create(req.body);
    res.json(newrequest)
})

router.route('/:id').put(auth, async (req, res) => {
    let updatedrequest = await request.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(updatedrequest);
})

router.route('/:id').delete(auth, async (req, res) => {
    let deletedrequest = await request.findByIdAndDelete(req.params.id);
    res.json(deletedrequest);
})

module.exports = router;