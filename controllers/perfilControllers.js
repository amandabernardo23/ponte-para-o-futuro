const db = require('../config/database');

// Controlador para listar perfil de um usuário específico
exports.obterPerfilPorUsuarioId = (req, res) => {
  const usuario_id = req.params.usuario_id;

  const sql = 'SELECT * FROM perfis WHERE usuario_id = ?';

  db.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar perfil:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar perfil' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensagem: 'Perfil não encontrado' });
    }

    res.json(results[0]);
  });
};

// Controlador para cadastrar um novo perfil
exports.criarPerfil = (req, res) => {
  const { usuario_id, idade, formacao, descricao, foto_perfil, instituicao, empresa } = req.body;

  if (!usuario_id) {
    return res.status(400).json({ mensagem: 'ID do usuário é obrigatório.' });
  }

  const sql = `
    INSERT INTO perfis (usuario_id, idade, formacao, descricao, foto_perfil, instituicao, empresa)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [usuario_id, idade, formacao, descricao, foto_perfil, instituicao, empresa], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar perfil:', err);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar perfil' });
    }

    res.status(201).json({ mensagem: 'Perfil criado com sucesso!', id: result.insertId });
  });
};