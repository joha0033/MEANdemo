const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

//Register
router.post('/register', (req, res, next) => {
  console.log('got 1');
  console.log(req.body);
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })
  console.log('newUser',newUser);

  User.sayIt('someshit!')//that worked

  User.addUser(newUser, (err, user) => {
    console.log('user',user);
    if(err) {
      res.json({success: false, msg: 'you failed to register'})
    } else {
      res.json({success: true, msg: 'You did it!... user'})
    }
  })
})

//Authenticate
router.post('/authenticate', (req, res, next) => {
  res.send('>> this is the res.send >> let me know why I should care who you are! Authenticate')
})

//Profile
router.get('/profile', (req, res, next) => {
  res.send('>> this is the res.send >> this is who you are, you did this, Profile')
})



module.exports = router;
