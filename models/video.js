const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  }
});

const Video = mongoose.model('videoSchema', videoSchema);

module.exports = Video;