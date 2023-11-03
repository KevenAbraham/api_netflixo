const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
