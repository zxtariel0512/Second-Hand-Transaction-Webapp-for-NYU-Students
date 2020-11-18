const router = require('express').Router();
let Listing = require('../models/listing');

const { auth } = require("../middleware/auth");

router.route('/').get(async (req, res) => {
    try {
        let foundListings = await Listing.find();
        res.json(foundListings);
    } catch (error) {
        res.status(500).json({message: "error: get all listing"})
    }
    
})

router.route('/:id').get(async (req, res) => {
    try {
        let foundListing = await Listing.findById(req.params.id);
        res.json(foundListing);   
    } catch (error) {
        res.status(500).json({message: "error: get specific listing"})
    }
    
})

router.route('/new').post(auth, async (req, res) => {
    try {
        let newListing = await Listing.create(req.body);
        res.json(newListing)
    } catch (error) {
        res.status(500).json({message: "error: create new listing"})

    }
    
})

router.route('/:id').put(auth, async (req, res) => {
    try {
        let updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedListing);
        
    } catch (error) {
        res.status(500).json({message: "error: update listing"})
    }
    
})

router.route('/:id').delete(auth, async (req, res) => {
    try {
        let deletedListing = await Listing.findByIdAndDelete(req.params.id);
        res.json(deletedListing);
        
    } catch (error) {
        res.status(500).json({message: "error: delete listing"})
    }
    
})

router.route('/netid/:netid').get(async(req, res) => {
    let findListing = await Listing.find({user_id: req.params.netid});
    res.json(findListing);
})

module.exports = router;