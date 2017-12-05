const express = require('express');
const Publication = require('../models/Publication');
const router = express.Router();

router.post('/', (req, res, next) => {
  const {title, image, rating, views, link, source} = req.body;
  const content = {title, image, rating, views, link, source}
  const publi = new Publication(content);

  publi.save()
  .then(publi => res.status(201).json(publi))
  .catch(e => res.status(500).json(e));
});


module.exports= router;
