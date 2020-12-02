const router = require("express").Router();
let Listing = require("../models/listing");
let Category = require("../models/category.model");


const { auth } = require("../middleware/auth");

// get all listings or perform a fuzzy search
router.route('/').get(async (req, res) => {
  //if query, fuzzy search
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    Listing.find({ $or: [{ title: regex }, { description: regex }] }, function (
      err,
      foundListings
    ) {
      if (err) {
        res.status(500).json({ message: "error: fuzzy search listings" });
      } else {
        if (foundListings.length > 0) {
          res.json(foundListings);
        } else {
          res.json({
            noneFound: "No results for your query, please try again.",
          });
        }
      }
    });
    //if no query, find all listings
  } else {
    try {
      var aggregateQuery = Listing.aggregate();
      Listing.aggregatePaginate(aggregateQuery, { page: parseInt(req.query.page), limit: parseInt(req.query.limit) }, function(
        err,
        result
      ) {
        if (err) {
          console.err(err);
        } else {
          res.json(result);
        }
      });
    } catch (error) {
      res.status(500).json({ message: "error: get all listings" });
    }
  }
});

//regular expression replacer
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Get an individual listing
router.route("/:id").get(async (req, res) => {
  try {
    let foundListing = await Listing.findById(req.params.id);
    res.json(foundListing);
  } catch (error) {
    res.status(500).json({ message: "error: get specific listing" });
  }
});

// Create a new listing
router.route("/new").post(auth, async (req, res) => {
  try {
    console.log(req.body);
    let currCategory = await Category.findOne({ name: req.body.category });
    console.log(currCategory);
    const L = {
      user_id: req.body.user_id,
      status: req.body.status,
      title: req.body.title,
      listingtype: req.body.listingtype,
      category: currCategory._id,
      description: req.body.description,
      cover_image_url: req.body.cover_image_url,
      detail_image_urls: JSON.parse(req.body.detail_image_urls),
      original_price: req.body.original_price,
      current_price: req.body.current_price,
      created_date: req.body.created_date,
      expire_date: req.body.expire_date,
      payment: req.body.payment,
      shipment: req.body.shipment,
    };
   
    let newListing = await Listing.create(L);
    currCategory.listings.push(newListing);
    await currCategory.save();
    res.json(newListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error: create new listing" });
  }
});

// Update individual listing
router.route("/:id").put(auth, async (req, res) => {
  try {
    let updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: "error: update listing" });
  }
});

// Delete individual listing
router.route("/:id").delete(auth, async (req, res) => {
  try {
    let deleteListing = await Listing.findByIdAndDelete(req.params.id);
    let currCategory = await Category.findById(deleteListing.category);
    const index = currCategory.listings.indexOf(deleteListing);
    currCategory.listings.splice(index, 1);
    await currCategory.save();
    res.json(deleteListing);
  } catch (error) {
    res.status(500).json({ message: "error: delete listing" });
  }
});

// Find all listings associated with a users netid
router.route("/netid/:netid").get(auth, async (req, res) => {
  let findListing = await Listing.find({ user_id: req.params.netid });
  res.json(findListing);
});

module.exports = router;
