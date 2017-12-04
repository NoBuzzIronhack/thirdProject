const express = require('express');
const Publication = require('../models/Publication');
const router = express.Router();
const xray = require('x-ray');
const x = xray();
const request = require('request-promise');
const cheerio = require('cheerio');

// const options = {
//   transform:function(body) {
//     return cheerio.load(body);
//   }
// }

router.get('/books', (req, res, next) => {
  let query = 'creer';
  request(`https://www.goodreads.com/search?utf8=%E2%9C%93&q=${query}&search_type=books&search%5Bfield%5D=title`)
  .then(function(body){
    let $ = cheerio.load(body);
    let name = $('.bookTitle span[itemprop="name"]');
    let author = $('.authorName span[itemprop="name"]');
    for(i=0; i<name.length; i++) {
      console.log(name[i].children[0].data + ' by ' + author[i].children[0].data);
    }

    // let values = Object.values(name.initialize);
    // values.forEach(e => {
    //   console.log(e.text());
    // })
  })
  .catch(function (err){
    console.log('error');
  })
});

module.exports= router;
