const express = require('express');
const router = express.Router();
const universidadeController = require('../controllers/universidadeController');

router.post('/cadastro', universidadeController.cadastrar);
router.post('/login', universidadeController.login);

module.exports = router;
