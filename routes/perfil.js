const express = require('express');
const router = express.Router();
const perfilControllers = require('../controllers/perfilControllers');

router.get('/perfil/:usuarioId', perfilControllers.buscarPerfil);
router.post('/perfil/:usuarioId', perfilControllers.salvarPerfil);

module.exports = router;