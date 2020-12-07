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
      res.json(foundpurchase);
    } catch (error) {
      res.status(500).json({ message: "error: get specific purchased" });
    }
  });

// get all purchases by netid
router.route("/netid/:netid").get( async (req, res) => {
    try {
        let purchases = await Purchase.find({ buyer: req.params.netid }).populate("item");

        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: "error: get purchased items by id" });
    }
})

//create new purchased and marked the item unavailable
router.route("/new").post(async (req, res) => {
    try {
        let aListing = await Listing.findByIdAndUpdate(req.body.item,{status:"unavailable"},
        { new: true });
        const p = {
            buyer:req.body.buyer,
            item:aListing._id,
            stripeCheckoutId:req.body.stripeCheckoutId
        }

        let newpurchased = await Purchase.create(p);
        res.json(newpurchased);
    }catch(error){
        res.status(500).json({ message: "create new purchased and marked the item unavailable" });
    }
});

router.route("/complete/:id").put(async (req, res) => {
    try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
        const updatedListing = await Listing.findByIdAndUpdate(updatedPurchase.item, { status: "unavailable" }, { new: true});

        res.json(updatedPurchase);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "error making purchase complete" })
    }
})


module.exports = router;

