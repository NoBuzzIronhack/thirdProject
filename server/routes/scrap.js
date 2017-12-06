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
    author: req.body.author,
    rating: req.body.rating,
    link: "https://www.amazon.com/gp/product/" + req.body.link,
    category: "Book"
  })

  Publication.findOne({ 'title': req.body.title }, (err, publication) => {
    if (err) { return next(err) }
    else if (publication) {
      res.status(200).json({'message':'la publicacion ya existe'})
      // aqui guardar relacion user/publicacion
    }
    else {
      publication.save()
      .then(answer => {
        // aqui guardar relacion user/publicacion
        res.status(200).json({'message':'publication guardada correctamente'})
      })
      .catch(err => {
        console.log(err)
      })
    }
  })
});

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

//Get Videos
router.get('/video/youtube', (req, res, render) => {
   let query = req.query.q;
   var opts = {
     maxResults: 10,
     key: 'AIzaSyBYtE6_mqYZKJPLuj7fz9oGtLoJJcebDXs'
   };
   search(query, opts, function(err, results) {
     if(err) return console.log(err);
     let videoResults = results.map(video => {
       return {
         title: video.title,
          link: video.link,
        image: video.thumbnails.default.url,
        createdAt: video.publishedAt
      }
     })
     res.status(200).json(videoResults)
   });
})

router.post('/video/youtube/detail', (req,res,render) =>{
  const publication = new Publication({
    title: req.body.title,
    image: req.body.image,
    link: req.body.link,
    createdAt: req.body.publishedAt,
    category: "Video"
  })

  Publication.findOne({ 'title': req.body.title }, (err, publication) => {
    if (err) { return next(err) }
    else if (publication) {
      res.status(200).json({'message':'la publicacion ya existe'})
      // aqui guardar relacion user/publicacion
    }
    else {
      publication.save()
      .then(answer => {
        // aqui guardar relacion user/publicacion
        res.status(200).json({'message':'publication guardada correctamente'})
      })
      .catch(err => {
        console.log(err)
      })
  }
  })
});

router.post('/publication', (req, res, render) => {
  const url = `https://api.microlink.io?url=${req.query.url}`;
  const publication = new Publication({
    title: req.body.title,
    image: req.body.image.url,
    author: req.body.publisher,
    link: req.body.url,
    category: "Publication"
  })

  Publication.findOne({ 'link': req.body.url }, (err, publication) => {
    if (err) { return next(err) }
    else if (publication) {
      res.status(200).json({'message':'la publicacion ya existe'})
      // aqui guardar relacion user/publicacion
    }
    else {
      publication.save()
      .then(answer => {
        // aqui guardar relacion user/publicacion
        res.status(200).json({'message':'publication guardada correctamente'})
      })
      .catch(err => {
        console.log(err)
      })
  }
  })
});


// router.post('/article', (req, res, render) => {
//   let url = req.query.url;
//   // let url = "http://www.wired.co.uk/article/best-startups-in-berlin-2017";
//   console.log(url);
//   request(url)
//   .then (function (body){
//     let $ = cheerio.load(body);
//     let titleTag = $('h1');
//     let imageTag = $('img');
//     // let imageList = Array.from($('img'));
//
//     let title = titleTag[0].children[0].data || titleTag[1].children[0].data || '';
//     let image = imageTag[3].currentSrc;
//     console.log(title, image);
//   })
// });

module.exports= router;
