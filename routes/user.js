const router = require('express').Router();
let User = require('../models/user.model');

const { auth } = require("../middleware/auth");

router.route('/').get(async(req, res) => {
  try {
    let foundUsers = await User.find();
    res.json(foundUsers);
    
  } catch (error) {
    res.status(500).json({message: "error: get all user"})
  }
  })

router.route('/:netid').get(async (req, res) => {
  try {
    let foundUser = await User.findOne({netid: req.params.netid});
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

module.exports = router;
