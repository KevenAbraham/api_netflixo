const express = require('express');
const router = express.Router();
const Video = require('../models/video');

// Rota para obter todos os contatos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getVideo, (req, res) => {
  res.json(res.video);
});

router.post('/', async (req, res) => {
  const video = new Video({
    title: req.body.nome,
    link: req.body.email,
    foto: req.body.foto,
  });

  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', getVideo, async (req, res) => {
  if (req.body.nome != null) {
    res.video.nome = req.body.nome;
  }
  if (req.body.email != null) {
    res.video.email = req.body.email;
  }
  if (req.body.telefone != null) {
    res.video.telefone = req.body.telefone;
  }
  if (req.body.endereco != null) {
    res.video.endereco = req.body.endereco;
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

router.delete('/:id', getVideo, async (req, res) => {
  try {
    await res.video.remove();
    res.json({ message: 'Vídeo excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    if (video == null) {
      return res.status(404).json({ message: 'Video não encontrado' });
    }
    res.video = video;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
