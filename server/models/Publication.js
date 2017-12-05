const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES = require('./publication-categories')
const TAGS = require('./publication-tags')

const publicationSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  rating: Number,
  views: Number,
  link: { type: String, required: true },
  source: String,
  category: { type:String, enum: TYPES, required: true },
  tags: { type:String, enum:TAGS }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;
