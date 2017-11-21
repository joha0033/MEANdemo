const mongoose = require('mongoose')
const config = require('../config/database')
const moment = require('moment')

const PostSchema = mongoose.Schema({

  author:{
    type: String,
    require: true
  },
  content:{
    type: String,
    require: true
  },
  createdOn: {
    type: String,
    require: true,
    deault: moment(new Date()).format("MMM DD, YYYY")
  }
  // Votes: {
  //   type: Number,
  //   required: true,
  //   default: 0
  // },
  // Flags: {
  //   type: Number,
  //   required: true,
  //   default: 0
  // }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post

module.exports.addPost = function (newPost, callback){
      newPost.save(callback)
}

module.exports.findByIdAndRemove = function (postId, callback){
      Post.find({_id: postId}).remove(callback)
}

module.exports.findByIdAndRemove = function (postId, callback){
      Post.find({_id: postId}).remove(callback)
}

// module.exports.getPostsById = function (userId, callback){
//   Post.find({}).populate('user').exec(callback)
// }
