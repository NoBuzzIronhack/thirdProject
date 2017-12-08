const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  following: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  time : { type : Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
