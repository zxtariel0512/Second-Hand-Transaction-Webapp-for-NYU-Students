const router = require("express").Router();
let Purchase = require("../models/purchase.model");
let Listing = require("../models/listing");

//get all purchased
router.route("/").get(async (req, res) => {
    try{
        let foundallpurchased = await Purchase.find().
        populate('itemId');
        res.json(foundallpurchased);
    }catch(error){
        res.status(500).json({ message: "error: get all purchased" });
    }
});

// //get specific purchased
// router.route("/:id").get(async (req, res) => {
//     try {
//       let foundpurchased = await Purchase.findById(req.params.id).
//       populate('itemId');
//       res.json(foundpurchased);
//     } catch (error) {
//       res.status(500).json({ message: "error: get specific purchased" });
//     }
//   });

// get specific purchase with stripe session id
router.route("/:session_id").get(async (req, res) => {
    try {
      let foundpurchase = await Purchase.findOne({ stripeCheckoutId: req.params.session_id}).populate('item');
      console.log(foundpurchase);
      res.json(foundpurchase);
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

        let newpurchased = await Purchase.create(p);
        res.json(newpurchased);
    }catch(error){
        res.status(500).json({ message: "create new purchased and marked the item unavailable" });
    }
});
module.exports = router;