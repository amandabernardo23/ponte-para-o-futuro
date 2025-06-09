const express = require('express');
const router = express.Router();
const reuniaoController = require('../controllers/reuniaoController');

router.post('/agendar', reuniaoController.criarReuniao);

module.exports = router;