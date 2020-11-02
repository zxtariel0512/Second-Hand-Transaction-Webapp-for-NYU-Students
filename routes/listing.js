const router = require('express').Router();
let Listing = require('../models/listing');

router.route('/').get(async (req, res) => {
    let foundListings = await Listing.find();
    res.json(foundListings);
  })
  
router.route('/').post(async (req, res) => {
    let newListing = await Listing.create(req.body);
    res.json(newListing)
})

module.exports = router;