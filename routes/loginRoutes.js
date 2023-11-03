const express = require('express');
const router = express.Router();
const Login = require('../models/login');

// Rota para obter todos os contatos
router.get('/', async (req, res) => {
  try {
    const logins = await Login.find();
    res.json(logins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getLogin, (req, res) => {
  res.json(res.login);
});

router.post('/', async (req, res) => {
  const login = new Login({
    title: req.body.nome,
    link: req.body.email,
    foto: req.body.foto,
  });

  try {
    const newLogin = await login.save();
    res.status(201).json(newLogin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', getLogin, async (req, res) => {
  if (req.body.nome != null) {
    res.login.nome = req.body.nome;
  }
  if (req.body.email != null) {
    res.login.email = req.body.email;
  }
  if (req.body.telefone != null) {
    res.login.telefone = req.body.telefone;
  }
  if (req.body.endereco != null) {
    res.login.endereco = req.body.endereco;
  }
  if (req.body.foto != null) {
    res.login.foto = req.body.foto;
  }

  try {
    const updatedLogin = await res.login.save();
    res.json(updatedLogin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getLogin, async (req, res) => {
  try {
    await res.login.remove();
    res.json({ message: 'Conta excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getLogin(req, res, next) {
  try {
    const login = await Login.findById(req.params.id);
    if (login == null) {
      return res.status(404).json({ message: 'Conta não encontrado' });
    }
    res.login = login;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
