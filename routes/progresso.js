const express = require('express');
const router = express.Router();
const progressoController = require('../controllers/progressoController');

// GET /api/progresso/:id
router.get('/:id', progressoController.getProgressoProjeto);
router.post('/', progressoController.criarEtapa);
router.put('/:id', progressoController.atualizarStatusEtapa);


module.exports = router;
