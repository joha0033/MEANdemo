const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/database');
const User = require('../models/user')

require('../config/passport')(passport)

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ users: users });
  })
});

//Register
router.post('/register', (req, res, next) => {
  console.log('in post for register');
  let newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  console.log('newUser',newUser);

  User.addUser(newUser, (err, user) => {
    console.log('user',user);
    if(err) {
      res.json({success: false, msg: 'you failed to register'})
    } else {
      res.json({success: true, msg: 'You did it!... user'})
    }
  })
})

// Authenticate
router.post('/authenticate', function(req, res, next) {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  console.log('username>', username);

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Test
router.get('/123', (req, res, next) => {
  console.log('get 123 get?');
  return res.json({msg:"hi! from 123"})
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  console.log('got in profile get.');
  res.json({user: req.user});
});

module.exports = router;
