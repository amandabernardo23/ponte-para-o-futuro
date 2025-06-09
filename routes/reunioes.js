const express = require('express');
const router = express.Router();
const reuniaoController = require('../controllers/reuniaoController');

router.post('/agendar', reuniaoController.criarReuniao);
router.get('/alunos/:id_projeto', listarAlunosDoProjeto);
router.get('/reunioes/alunos/:idProjeto', reuniaoController.buscarAlunosDoProjeto);

module.exports = router;