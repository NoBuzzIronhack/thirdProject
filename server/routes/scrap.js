const express = require('express');
const Publication = require('../models/Publication');
const router = express.Router();
const xray = require('x-ray');
const x = xray();
const request = require('request-promise');
const cheerio = require('cheerio');
const search = require('youtube-search');



router.get('/books/detail', (req, res, next) =>{
  let url = req.query.url;
  request('http://www.goodreads.com'+url)
  .then(function(body){
    let $ = cheerio.load(body);
    let nameTag = $('h1[itemprop="name"]');
    let authorTag = $('.authorName span[itemprop="name"]');
    let isbnTag = $('span[itemprop="isbn"]');
    let imageTag = $('#coverImage');
    let ratingTag = $('.average[itemprop="ratingValue"]')
    let name = (nameTag[0].children[0].data).trim();
    let author = authorTag[0].children[0].data;
    let isbn = isbnTag[0].children[0].data;
    let image= imageTag[0].attribs.src;
    let rating= ratingTag[0].children[0].data;
    let bookObj = {
      name, author, isbn, image, rating
    }
    res.status(200).json(bookObj);
  })
})

router.post('/books/detail', (req, res, next) => {
  const publication = new Publication({
    title: req.body.title,
    image: req.body.image,
    rating: req.body.rating,
    link: "https://www.amazon.com/gp/product/" + req.body.link,
    category: "Book"
  })

  publication.save()
  .then(answer => {
    res.status(200).json({'message':'publication guardada correctamente'})
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/books', (req, res, next) => {
  let query = req.query.q;
  request(`https://www.goodreads.com/search?utf8=%E2%9C%93&q=${query}&search_type=books&search%5Bfield%5D=title`)
  .then(function(body){
    let $ = cheerio.load(body);
    let name = $('.bookTitle span[itemprop="name"]');
    let author = $('.authorName span[itemprop="name"]');
    let link = $('a[itemprop="url"]')
    let bookResult = [];
    for(i=0; i<name.length; i++) {
      // console.log(name[i].children[0].data + ' by ' + author[i].children[0].data + link[0].attribs.href);
      let bookObj = {title:name[i].children[0].data,
      author: author[i].children[0].data,
      link: link[0].attribs.href}
      bookResult.push(bookObj)
    };
    res.status(200).json(bookResult);
  })
  .catch(function (err){
    console.log('error');
  })
});




// Get Videos
//  router.get('/videos', (req, res, render )=>{
//    let query = "ted"
//    var opts = {
//      maxResults: 10,
//      key: 'AIzaSyBYtE6_mqYZKJPLuj7fz9oGtLoJJcebDXs'
//    };
//    search(query, opts, function(err, results) {
//      if(err) return console.log(err);
//
//      console.dir(results);
//    });
// })
//
// router.get ('/article', (req, res, render) => {
//   let search = "http://www.elmundo.es/madrid/2017/12/05/5a2680cf22601ddd378b4631.html";
//   request(search)
//   .then (function (body){
//     let $ = cheerio.load(body);
//     let title = $('h1');
//     let image = $('img')
//
//   })
// })




module.exports= router;
