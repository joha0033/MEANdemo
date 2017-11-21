const express = require('express')
const router = express.Router()
const config = require('../config/database');
const Post = require('../models/post')
const mpromise = require('mpromise')
const moment = require('moment')


//seed database

// Test
// router.get('/123', (req, res, next) => {
//   console.log('get 123 get?');
//   return res.json({msg:"hi! from posts.js"})
// });


router.get('/', function(req, res) {

  Post.find({}, function(err, posts) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ posts: posts });
  })

});

router.get('/:name', function(req, res) {
  let name = req.params.name
  console.log('req.params.name>', name);

  Post.find({author: name}, function(err, posts) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ posts: posts });
  })

});


//create a new post
router.post('/create', function(req, res) {
  var post = req.body;
  let newPost = new Post ({
    author: req.body.author,
    content: req.body.content,
    createdOn: moment(new Date()).format("MMM DD, YYYY")
  })

  Post.addPost(newPost, (err, post) => {
    if(err) {
      res.json({success: false, msg: 'Boo you, failed to make a new post'})
    } else {
      res.json({success: true, msg: 'You did it!... post created'})
    }
  })

});

// router.put('/:postId', function(req, res) {
//   var id = req.params.id;
//
//   Post.findByIdAndUpdate(id, function(err, post) {
//     if (err) return handleError(err);
//   post.content = 'large';
//   post.save(function (err, updatedPost) {
//     if (err) return handleError(err);
//     res.send(updatedPost);
//   });
// });
// })

router.delete('/:id', function(req, res) {
  var id = req.params.id;

  Post.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Post Deleted' });
  });

});

module.exports = router;
