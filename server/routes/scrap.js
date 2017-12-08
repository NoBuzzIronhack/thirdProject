const express = require('express');
const Publication = require('../models/Publication');
const Relational = require('../models/Relational');
const router = express.Router();
const xray = require('x-ray');
const x = xray();
const request = require('request-promise');
const cheerio = require('cheerio');
const search = require('youtube-search');


router.get('/books/detail', (req, res, next) => {
  let url = req.query.url;
  request('http://www.goodreads.com' + url)
    .then(function(body) {
      let $ = cheerio.load(body);
      let nameTag = $('h1[itemprop="name"]');
      let authorTag = $('.authorName span[itemprop="name"]');
      let isbnTag = $('span[itemprop="isbn"]');
      let imageTag = $('#coverImage');
      let ratingTag = $('.average[itemprop="ratingValue"]')
      let title = (nameTag[0].children[0].data).trim();
      let author = authorTag[0].children[0].data;
      let isbn = isbnTag[0].parent.prev.data.trim();
      let image = imageTag[0].attribs.src;
      let rating = ratingTag[0].children[0].data;
      let bookObj = {
        title,
        author,
        isbn,
        image,
        rating
      }
      res.status(200).json(bookObj);
    })
})

router.post('/books/detail', (req, res, next) => {
  const newPublication = new Publication({
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
    rating: req.body.rating || '',
    link: "https://www.amazon.com/gp/product/" + req.body.isbn,
    category: "Book"
  })

  Publication.findOne({
    'title': req.body.title
  }, (err, publication) => {
    if (err) {
      return next(err)
    } else if (publication) {
      let newRelation = new Relational({
        creator: req.user._id,
        publication: publication._id,
        comments: req.body.comments
      });
      newRelation.save()
        .then(saved => {
          res.status(200).json(saved)
        })
    } else {
      newPublication.save()
        .then(answer => {
          let newRelation = new Relational({
            creator: req.user._id,
            publication: answer._id,
            comments: req.body.comments || ''
          });
          newRelation.save()
            .then(saved => {
              res.status(200).json(saved)
            })
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
    .then(function(body) {
      let $ = cheerio.load(body);
      let name = $('.bookTitle span[itemprop="name"]');
      let author = $('.authorName span[itemprop="name"]');
      let link = $('a[itemprop="url"]')
      let bookResult = [];
      for (i = 0; i < name.length; i++) {
        let bookObj = {
          title: name[i].children[0].data,
          author: author[i].children[0].data,
          link: link[0].attribs.href
        }
        bookResult.push(bookObj)
      };
      res.status(200).json(bookResult);
    })
    .catch(function(err) {
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
    if (err) return console.log(err);
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
});

router.post('/video/youtube/detail', (req,res,render) =>{

  const newPublication = new Publication({
    title: req.body.title,
    image: req.body.image,
    link: req.body.link,
    createdAt: req.body.publishedAt,
    category: "Video"
  })
//find one video and save
  Publication.findOne({ 'title': req.body.title }, (err, publication) => {
    if (err) { return next(err) }
      else if (publication) {
        let newRelation = new Relational({
          creator: req.user._id,
          publication: publication._id,
          comments: req.body.comments
        });
        newRelation.save()
        .then(saved => {
          res.status(200).json(saved)
        });
    }
    else {
        newPublication.save()
        .then(answer => {
          let newRelation = new Relational({
            creator: req.user._id,
            publication: answer._id,
            comments: req.body.comments || ''
          });
          newRelation.save()
          .then(saved => {
            res.status(200).json(saved)
          })
        })
      .catch(err => {
        console.log(err)
      })
    }
  })
});


router.get('/publi', (req, res, next) => {
  const url = `https://api.microlink.io?url=${req.query.url}`;
  request({
      url,
      json: true
    })
    .then(function(json) {
      let myPublic = {
        title: json.data.title,
        image: json.data.image.url,
        author: json.data.publisher,
        link: json.data.url
      }
      res.status(200).json(myPublic)
    })
});


router.post('/publi', (req, res, next) => {
    const newPublication = new Publication({
      title: req.body.title,
      image: req.body.image,
      author: req.body.author,
      link: req.body.link,
      category: "Publication"
    })
    Publication.findOne({'link': req.body.link}, (err, doc) => {
        if (err) { return next(err) } else if (doc) {
          let newRelation = new Relational({
            creator: req.user._id,
            publication: doc._id,
            comments: req.body.comments || ''
          });
          newRelation.save()
          .then(saved => {
            res.status(200).json(saved)
          })
        } else {
          newPublication.save()
          .then(answer => {
            let newRelation = new Relational({
              creator: req.user._id,
              publication: answer._id,
              comments: req.body.comments || ''
            });
            newRelation.save()
              .then(saved => {
                res.status(200).json(saved)
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
    })
});



module.exports = router;
