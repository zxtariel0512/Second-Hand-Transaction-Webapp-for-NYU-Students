const router = require("express").Router();
let purchased = require("../models/purchased.model");
let Listing = require("../models/listing");

//get all purchased
router.route("/").get(async (req, res) => {
    try{
        let foundallpurchased = await purchased.find().
        populate('itemId');
        res.json(foundallpurchased);
    }catch(error){
        res.status(500).json({ message: "error: get all purchased" });
    }
});

//get specific purchased
router.route("/:id").get(async (req, res) => {
    try {
      let foundpurchased = await purchased.findById(req.params.id).
      populate('itemId');
      res.json(foundpurchased);
    } catch (error) {
      res.status(500).json({ message: "error: get specific purchased" });
    }
  });

//create new purchased and marked the item unavailable
router.route("/new").post(async (req, res) => {
    try {
        let aListing = await Listing.findByIdAndUpdate(req.body.itemId,{status:"unavailable"},
        { new: true });
        const p = {
            buyernetid:req.body.buyernetid,
            itemId:aListing._id,
            stripeCheckoutId:req.body.stripeCheckoutId
        }

        let newpurchased = await purchased.create(p);
        res.json(newpurchased);
    }catch(error){
        res.status(500).json({ message: "create new purchased and marked the item unavailable" });
    }
});
module.exports = router;