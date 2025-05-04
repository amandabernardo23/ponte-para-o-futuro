const db = require('../config/database');

// Cadastrar usuários
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

// Listar usuários
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
// Buscar usuário por ID
exports.buscarUsuarioPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT id, nome, email, tipo, status FROM usuarios WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    }
    if (results.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.json(results[0]);
  });
};

// Atualizar usuário
exports.atualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, tipo } = req.body;

  const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ? WHERE id = ?';
  db.query(sql, [nome, email, senha, tipo, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
    }
    res.json({ mensagem: 'Usuário atualizado com sucesso!' });
  });
};

// Deletar usuário
exports.deletarUsuario = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM usuarios WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao deletar usuário' });
    }
    res.json({ mensagem: 'Usuário deletado com sucesso!' });
  });
};
