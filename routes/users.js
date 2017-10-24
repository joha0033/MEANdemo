const express = require('express')
const router = express.Router()

//Register
router.port('/register', (req, res, next) => {
  res.send('>> this is the res.send >> let me know who you are! tell me... because you are at the register route, and that is why I made it')
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
