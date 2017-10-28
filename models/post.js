const mongoose = require('mongoose')
const config = require('../config/database')
const moment = require('moment')

const PostSchema = mongoose.Schema({
  author: {
    type: String,
    require: true
  },
  //soon to be data
  // [
  //    {
  //       type: mongoose.Schema.Types.ObjectId,
  //       require: true,
  //       ref: 'User'
  //    }
  // ]
  content: {
    type: String,
    require: true
  },
  createdOn: {
    type: Date,
    require: true,
    deault: moment(new Date()).format("MMM DD, YYYY")
  },
  Votes: {
    type: Number,
    required: true,
    default: 0
  },
  Flags: {
    type: Number,
    required: true,
    default: 0
  }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post

module.exports.addPost = function (newPost, callback){
      console.log('you made it into addPost export');
      newPost.save(callback)


}
// module.exports.create = function(newPost, callback){
//   newPost.save(callback)
//   console.log('new post!', newPost)
// }

// const Post = module.exports = mongoose.model('post', PostSchema)
//
// module.exports.getPostByAuthor = function(author, callback){
//   User.findByAuthor(author, callback)
// }
//
// module.exports.getUserByCreatedOn = function(createdOn, callback){
//   const query = {createdOn: createdOn}
//   Post.findOne(query, callback)
// }
//
// module.exports.sayIt = function(someshit){
//   console.log('this is how it works', someshit);
// }
//
// module.exports.addPost = function (newPost, callback){
//       newPost.save(callback)
// }
