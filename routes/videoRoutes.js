const express = require('express');
const router = express.Router();
const Video = require('../models/video');

// Rota para obter todos os vídeos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter o vídeo pelo ID
router.get('/:id', getVideo, (req, res) => {
  res.json(res.video);
});

// Rota para criar um novo vídeo
router.post('/', async (req, res) => {
  const video = new Video({
    title: req.body.title,
    link: req.body.link,
    foto: req.body.foto,
  });

  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um vídeo por ID
router.put('/:id', getVideo, async (req, res) => {
  if (req.body.title != null) {
    res.video.title = req.body.title;
  }
  if (req.body.link != null) {
    res.video.link = req.body.link;
  }
  if (req.body.foto != null) {
    res.video.foto = req.body.foto;
  }

  try {
    const updatedVideo = await res.video.save();
    res.json(updatedVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Rota para excluir um vídeo por ID
router.delete('/:id', getVideo, async (req, res) => {
  try {
    await res.video.deleteOne();
    res.json({ message: 'Vídeo excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (video == null) {
      return res.status(404).json({ message: 'Vídeo não encontrado!' });
    }
    res.video = video;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;