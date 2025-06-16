const express = require('express');
const router = express.Router();
const perfilControllers = require('../controllers/perfilControllers');

router.get('/perfil/:usuarioId', perfilControllers.buscarPerfil);
router.post('/perfil/:usuarioId', (req, res, next) => {
  console.log(`POST /api/perfil/${req.params.usuarioId} recebido`);
  perfilControllers.salvarPerfil(req, res);
});

module.exports = router;