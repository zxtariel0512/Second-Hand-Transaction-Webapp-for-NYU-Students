const router = require('express').Router();
let User = require('../models/user.model');

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

router.route('/:netid').put(async (req, res) => {
  let updatedUser = await User.findOneAndUpdate({netid: req.params.netid}, req.body, {new:true});
  res.json(updatedUser);
})

router.route('/:netid').delete(async (req, res) => {
  let deletedUser = await User.findOneAndDelete({netid: req.params.netid});
  res.json(deletedUser);
})

module.exports = router;