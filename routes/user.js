const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get(async(req, res) => {
    let foundUsers = await User.find();
    res.json(foundUsers);
  })
  
router.route('/register').post(async(req, res) => {
    let newUser = await User.create(req.body);
    res.json(newUser);
})

module.exports = router;