const express = require('express');
const router = express.Router();
const upload = require('../uploads');
const perfilController = require('../controllers/perfilControllers');
const db = require('../config/database');



// Salvar perfil (com upload de foto)
router.post('/:usuarioId', upload.single('foto'), perfilController.salvarPerfil);
// Rota para buscar o perfil
router.get('/:usuarioId', perfilController.buscarPerfil);
module.exports = router;
