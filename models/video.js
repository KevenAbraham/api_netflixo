const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  }
});

const Videos = mongoose.model('Videos', videoSchema);

module.exports = Videos;