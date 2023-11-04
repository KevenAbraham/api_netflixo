const express = require('express');
const router = express.Router();
const Login = require('../models/login');

// Rota para obter todas as contas logadas
router.get('/', async (req, res) => {
  try {
    const logins = await Login.find();
    res.json(logins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter uma conta pelo ID
router.get('/:id', getLogin, (req, res) => {
  res.json(res.login);
});

// Rota para criar uma nova conta
router.post('/', async (req, res) => {
  const login = new Login({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
  });

  try {
    const newLogin = await login.save();
    res.status(201).json(newLogin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar uma conta por ID
router.put('/:id', getLogin, async (req, res) => {
  if (req.body.nome != null) {
    res.login.nome = req.body.nome;
  }
  if (req.body.email != null) {
    res.login.email = req.body.email;
  }
  if (req.body.senha != null) {
    res.login.senha = req.body.senha;
  }

  try {
    const updatedLogin = await res.login.save();
    res.json(updatedLogin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Rota para excluir uma conta por ID
router.delete('/:id', getLogin, async (req, res) => {
  try {
    await res.login.deleteOne();
    res.json({ message: 'Conta excluída com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getLogin(req, res, next) {
  try {
    const login = await Login.findById(req.params.id);
    if (login == null) {
      return res.status(404).json({ message: 'Conta não encontrada' });
    }
    res.login = login;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;