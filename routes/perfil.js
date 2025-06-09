const express = require('express');
const router = express.Router();
const perfilControllers = require('../controllers/perfilControllers');

router.get('/perfil/:usuario_id', perfilControllers.obterPerfilPorUsuarioId);
router.post('/perfil', perfilControllers.criarPerfil);

module.exports = router;