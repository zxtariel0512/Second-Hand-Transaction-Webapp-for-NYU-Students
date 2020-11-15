const router = require('express').Router();
let User = require('../models/user.model');
let Review = require('../models/review.model');

const { auth } = require("../middleware/auth");

router.route('/').get(async(req, res) => {
  // try {
    let foundUsers = await User.find().
    populate('reviews');
    res.json(foundUsers);
  // } catch (error) {
  //   res.status(500).json({message: "error: get all user failed"})
  // }
  })

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
  
router.route('/register').post(async(req, res) => {
  try {
    let newUser = await User.create(req.body);
    res.json(newUser); 
  } catch (error) {
    res.status(500).json({message: "error: create new user"})
  }
})

router.route('/:netid').put(auth, async (req, res) => {
  try {
    let updatedUser = await User.findOneAndUpdate({netid: req.params.netid}, req.body, {new:true});
    res.json(updatedUser);
    
  } catch (error) {
    res.status(500).json({message: "error: update user"})
  }
})

router.route('/:netid').delete(auth, async (req, res) => {
  try {
    let deletedUser = await User.findOneAndDelete({netid: req.params.netid});
    res.json(deletedUser);
    
  } catch (error) {
    res.status(500).json({message: "error: delete user"})
  }
})

router.route('/login/:netid').put(auth, async(req, res) =>{
  try {
    let dumUser = await User.findOne({netid: req.params.netid});
    dumUser.valid = true;
    let validUser = await User.findOneAndUpdate({netid: req.params.netid}, dumUser, {new:true});
    res.json(validUser);
    
  } catch (error) {
    res.status(500).json({message: "error: login user"})
  }
})

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

router.route('/review/post/:netid').post(async(req, res) =>{
  // try{
    let targetUser = await User.findOne({netid: req.params.netid});
    const dummyReview = new Review();
    dummyReview.target = targetUser._id;
    dummyReview.rating = req.body.rating;
    dummyReview.description = req.body.description;
    let newReview = await Review.create(dummyReview);
    targetUser.reviews.push(newReview);
    await targetUser.save();
    res.json(newReview);
  // } catch(error){
  //   res.status(500).json({message: "error: post review"})
  // }

})




module.exports = router;
