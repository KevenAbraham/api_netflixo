const express = require('express');
const router = express.Router();
const Video = require('../models/video');

// Rota para obter todos os video
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um video por ID
router.get('/:id', getVideo, (req, res) => {
  res.json(res.video);
});

// Rota para criar um novo user
router.post('/', async (req, res) => {
  // Verifica se o link já está cadastrado
  const existingVideo = await Video.findOne({ link: req.body.link });
  if (existingVideo) {
    return res.status(400).json({ message: 'E-mail já cadastrado. Por favor, escolha outro.' });
  }

  // Cria um novo usuário se o e-mail não estiver cadastrado
  const video = new Video({
    link: req.body.link,
  });

  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um user por ID
router.put('/:id', getVideo, async (req, res) => {
  if (req.body.link != null) {
    res.video.link = req.body.link;
  }

  try {
    const updatedVideo = await res.video.save();
    res.json(updatedVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Rota para excluir um user por ID
router.delete('/:id', getVideo, async (req, res) => {
  try {
    await res.video.deleteOne();
    res.json({ message: 'User- excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (video == null) {
      return res.status(404).json({ message: 'User não encontrado' });
    }
    res.video = video;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;