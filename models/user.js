const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/database')

const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password:{
    type: String,
    require: true
  },
  posts: [
   {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Post'
   }
]
})

const User = module.exports = mongoose.model('user', UserSchema)

module.exports.getUserById = function(id, callback){
  User.findById(id, callback)
}

module.exports.getUserByUsername = function(username, callback){
  console.log('export get user by Username hit');
  const query = {username: username}
  User.findOne(query, callback)
}

module.exports.sayIt = function(someshit){
  console.log('this is how it works', someshit);
}

module.exports.addUser = function (newUser, callback){
  console.log('addUser hit');
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) {throw err}
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
