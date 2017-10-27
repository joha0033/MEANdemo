const mongoose = require('mongoose')
const config = require('../config/database')

const PostSchema = mongoose.Schema({
  text: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  createdOn:{
    type: Date(now),
    require: true
  }
})
