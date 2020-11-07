const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get(async(req, res) => {
    let foundUsers = await User.find();
    res.json(foundUsers);
  })

router.route('/:id').get(async (req, res) => {
    let foundUser = await User.findById(req.params.id);
    res.json(foundUser);
})
  
router.route('/register').post(async(req, res) => {
    let newUser = await User.create(req.body);
    res.json(newUser);
})

router.route('/:id').put(async (req, res) => {
  let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(updatedUser);
})

router.route('/:id').delete(async (req, res) => {
  let deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json(deletedUser);
})

module.exports = router;