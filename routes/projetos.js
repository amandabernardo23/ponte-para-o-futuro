const express = require('express');
const router = express.Router();
const projetosController = require('../controllers/projetosController');

// Listar projetos
router.get('/', projetosController.listarProjetos);

// Rota para cadastrar um novo projeto
router.post('/', projetosController.cadastrarProjeto);

module.exports = router;
