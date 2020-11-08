const router = require('express').Router();
let User = require('../models/user.model');

const { auth } = require("../middleware/auth");

router.route('/').get(async(req, res) => {
    let foundUsers = await User.find();
    res.json(foundUsers);
  })

router.route('/:netid').get(async (req, res) => {
    let foundUser = await User.findOne({netid: req.params.netid});
    res.json(foundUser);
})
  
router.route('/register').post(async(req, res) => {
    let newUser = await User.create(req.body);
    res.json(newUser);
})

router.route('/:netid').put(auth, async (req, res) => {
  let updatedUser = await User.findOneAndUpdate({netid: req.params.netid}, req.body, {new:true});
  res.json(updatedUser);
})

router.route('/:netid').delete(auth, async (req, res) => {
  let deletedUser = await User.findOneAndDelete({netid: req.params.netid});
  res.json(deletedUser);
})

router.route('/login/:netid').put(auth, async(req, res) =>{
  let dumUser = await User.findOne({netid: req.params.netid});
  dumUser.valid = true;
  let validUser = await User.findOneAndUpdate({netid: req.params.netid}, dumUser, {new:true});
  res.json(validUser);
})




module.exports = router;