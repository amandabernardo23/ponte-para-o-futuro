const db = require('../config/database');

// Controlador para cadastrar usuários
exports.cadastrarUsuario = (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios!' });
  }

  const sql = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';

  db.query(sql, [nome, email, senha, tipo], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
    }
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', id: result.insertId });
  });
};

// Controlador para listar usuários
exports.listarUsuarios = (req, res) => {
  const sql = 'SELECT id, nome, email, tipo, status FROM usuarios';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
    }
    res.json(results);
  });
};
