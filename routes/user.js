const router = require('express').Router();
let User = require('../models/user.model');
let Review = require('../models/review.model');

const { auth } = require("../middleware/auth");

// Get a list of all users
router.route('/').get(async(req, res) => {
  // try {
    let foundUsers = await User.find().
    populate('reviews');
    res.json(foundUsers);
  // } catch (error) {
  //   res.status(500).json({message: "error: get all user failed"})
  // }
  })

// Get an individual user by netid
router.route('/:netid').get(async (req, res) => {
  try {
    let foundUser = await User.findOne({netid: req.params.netid});
    await foundUser.populate('reviews').execPopulate();
    foundUser.populated('reviews');
    res.json(foundUser);
  } catch (error) {
    res.status(500).json({message: "error: find specific user"})
  }
})

// Create a new user
router.route('/register').post(async(req, res) => {
  try {
    let newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({message: "error: create new user"})
  }
})

// Update an individual user by netid
router.route('/:netid').put(auth,async (req, res) => {
  try {
    let updatedUser = await User.findOneAndUpdate({netid: req.params.netid}, req.body, {new:true});
    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({message: "error: update user"})
  }
})

// Delete an individual user by netid
router.route('/:netid').delete(auth,async (req, res) => {
  try {
    let deletedUser = await User.findOneAndDelete({netid: req.params.netid});
    res.json(deletedUser);

  } catch (error) {
    res.status(500).json({message: "error: delete user"})
  }
})

// Login individual user by netid
router.route('/login/:netid').put(auth,async(req, res) =>{
  try {
    let dumUser = await User.findOne({netid: req.params.netid});
    dumUser.valid = true;
    let validUser = await User.findOneAndUpdate({netid: req.params.netid}, dumUser, {new:true});
    res.json(validUser);

  } catch (error) {
    res.status(500).json({message: "error: login user"})
  }
})

// Get all the reviews of a user by netid
router.route('/review/:netid').get(auth, async(req, res) =>{
  try{
    let targetUser = await User.findOne({netid: req.params.netid});
    await targetUser.populate('reviews').execPopulate();
    targetUser.populated('reviews');
    res.json(targetUser.reviews);
  } catch(error){
    res.status(500).json({message: "error: get review"})
  }
})

// Delete an individual review from db and from user's review list
router.route('/review/:id').delete(auth, async(req, res) =>{
  try{
    let deletedReview = await Review.findByIdAndDelete(req.params.id);
    let targetUser = await User.findById(deletedReview.target);
    const index = targetUser.reviews.indexOf(deletedReview);
    targetUser.reviews.splice(index,1)
    await targetUser.save();
    res.json(deletedReview);
  } catch(error){
    res.status(500).json({message: "error: delete review"})
  }
})

// Update an individual review
router.route('/review/:id').put(auth, async(req, res) =>{
  try{
    let updatedReview = await Review.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.json(updatedReview);
  } catch(error){
    res.status(500).json({message: "error: update review"})
  }
})

//  Create a new review and add to the target users review list
router.route('/review/post/:netid').post(auth, async(req, res) =>{
  // body params: target can use netid
  try{
    let targetUser = await User.findOne({netid: req.params.netid});
    
    const review = {
      reviewer:req.body.reviewer,
      target: targetUser._id,
      rating: req.body.rating,
      description: req.body.description
    }

    let newReview = await Review.create(review);
    targetUser.reviews.push(newReview);
    await targetUser.save();
    res.json(newReview);
  } catch(error){
    res.status(500).json({message: "error: post review"})
  }

})

module.exports = router;
