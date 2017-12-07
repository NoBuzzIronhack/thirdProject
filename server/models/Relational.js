const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const relationalSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  publication: { type: Schema.Types.ObjectId, ref: 'Publication', required: true },
  comments: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Relational = mongoose.model('Relational', relationalSchema);
module.exports = Relational;
