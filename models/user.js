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
  userName: {
    type: String,
    require: true
  },
  password:{
    type: String,
    require: true
  }
})

const User = module.exports = mongoose.model('user', UserSchema)

module.exports.getUserById = function(id, callback){
  User.findById(id, callback)
}

module.exports.getUserByUserName = function(username, callBack){
  const query = {username: username}
  User.findOne(query, callback)
}

module.exports.sayIt = function(someshit){
  console.log('this is how it works', someshit);
}

module.exports.addUser = function (newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) {throw err}
      newUser.password = hash
      newUser.save(callback)
    })
  })
}
