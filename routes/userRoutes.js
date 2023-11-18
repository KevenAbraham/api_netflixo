const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Rota para obter todos os user
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um user por ID
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Rota para criar um novo usuário ou fazer login
router.post('/', async (req, res) => {
  if (req.body.action === 'register') {
    // Se a ação for "register", cria um novo usuário
    try {
      // Verifica se o e-mail já está cadastrado
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'E-mail já cadastrado. Por favor, escolha outro.' });
      }

      const user = new User({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
      });

      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else if (req.body.action === 'login') {
    // Se a ação for "login", verifica as credenciais e faz login
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user && user.senha === req.body.senha) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: 'Credenciais ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRO' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: 'Ação inválida' });
  }
});

// Rota para atualizar um user por ID
router.put('/:id', getUser, async (req, res) => {
  if (req.body.nome != null) {
    res.user.nome = req.body.nome;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.senha != null) {
    res.user.senha = req.body.senha;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Rota para excluir um user por ID
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: 'User- excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User não encontrado' });
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;