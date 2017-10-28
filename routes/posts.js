const express = require('express')
const router = express.Router()
const config = require('../config/database');
const Post = require('../models/post')
const mpromise = require('mpromise')


//seed database

// Test
router.get('/123', (req, res, next) => {
  console.log('get 123 get?');
  return res.json({msg:"hi! from posts.js"})
});


router.get('/posts', function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ posts: posts });
  });
});

router.post('/create', function(req, res) {
  console.log('in create post ');
  console.log(req.body);
  var post = req.body;

  let newPost = new Post ({
    author: req.body.author,
    content: req.body.content
  })

  console.log('new post!', newPost)

  Post.addPost(newPost, (err, post) => {
    console.log('post',post);
    if(err) {
      res.json({success: false, msg: 'Boo you, failed to make a new port'})
    } else {
      res.json({success: true, msg: 'You did it!... post created'})
    }
  })

});

router.put('/posts/:id', function(req, res) {
  var id = req.params.id;
  var post = req.body;
  if (post && post._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Post.findByIdAndUpdate(id, post, {new: true}, function(err, post) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'post': post, message: 'Post Updated' });
  });
});

router.delete('/posts/:id', function(req, res) {
  var id = req.params.id;
  Post.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Post Deleted' });
  });
});

module.exports = router;
