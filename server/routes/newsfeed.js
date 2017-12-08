const express = require('express');
const Publication = require('../models/Publication');
const Relational = require('../models/Relational');
const User = require('../models/User');
const router = express.Router();

// Aqui hay que hacer una busqueda de:
// 1. Los following del user, y con sus IDs,
// 2. traerse las publications posteadas de esos users a los que esta following

router.get('/home', (req, res, next) =>{
  const id = req.user._id;
  res.json(200)
})

module.exports = router;
