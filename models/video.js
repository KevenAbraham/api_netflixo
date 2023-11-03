const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;