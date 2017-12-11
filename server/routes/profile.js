const express = require('express');
const Publication = require('../models/Publication');
const Relational = require('../models/Relational');
const User = require('../models/User');
const router = express.Router();

router.get('/profile', (req, res, next) => {
const id = req.user._id;

  Relational
  .find({creator: id })
  .populate('publication')
  .exec((err, relation) => {
    res.status(200).json(relation)
  })
})

router.get('/profile/post', (req, res) => {
  const id = req.user.id;

  Relational
  .find({creator: id }, {post: true})
  .populate('publication')
  .exec((err, relation) => {
    console.log(relation)
    res.status(200).json(relation)
  })
  })


router.get('/profile/like', (req, res) => {
  const id = req.user.id;

  Relational
  .find({creator: id }, {post: false})
  .populate('publication')
  .exec((err, relation) => {
    console.log(relation)
    res.status(200).json(relation)
  })
})

module.exports = router;
