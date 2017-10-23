const express = require('express')
const router = express.Router()

//Register
router.get('/register', (req, res, next) => {
  res.send('>> this is the res.send >> let me know who you are! tell me... because you are at the register route, and that is why I made it')
})

//Authenticate
router.get('/authenticate', (req, res, next) => {
  res.send('>> this is the res.send >> let me know why I should care who you are! Authenticate')
})

//Profile
router.get('/profile', (req, res, next) => {
  res.send('>> this is the res.send >> this is who you are, you did this, Profile')
})

//Validate
router.get('/validate', (req, res, next) => {
  res.send('>> this is the res.send >> validate because I make you, and I know... Validate')
})

module.exports = router;
