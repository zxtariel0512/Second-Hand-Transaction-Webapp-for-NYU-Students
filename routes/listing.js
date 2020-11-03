const router = require('express').Router();
let Listing = require('../models/listing');

router.route('/').get(async (req, res) => {
    let foundListings = await Listing.find();
    res.json(foundListings);
})

router.route('/:id').get(async (req, res) => {
    let foundListing = await Listing.findById(req.params.id);
    res.json(foundListing);
})

router.route('/new').post(async (req, res) => {
    let newListing = await Listing.create(req.body);
    res.json(newListing)
})

router.route('/:id').put(async (req, res) => {
    let updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(updatedListing);
})

router.route('/:id').delete(async (req, res) => {
    let deletedListing = await Listing.findByIdAndDelete(req.params.id);
    res.json(deletedListing);
})

module.exports = router;