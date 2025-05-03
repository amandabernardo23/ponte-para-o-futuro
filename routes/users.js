const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Cadastro de novo usuário
router.post('/', userController.cadastrarUsuario);

// Listar usuários
router.get('/', userController.listarUsuarios);

module.exports = router;