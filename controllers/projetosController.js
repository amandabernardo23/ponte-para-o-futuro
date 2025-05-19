const db = require('../config/database');

// Controlador para listar os projetos cadastrados
exports.listarProjetos = (req, res) => {
  const sql = 'SELECT id, título, descrição, status, data_inicio, data_termino FROM projetos';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar projetos:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar projetos' });
    }
    res.json(results);
  });
};

// Controlador para cadastrar um novo projeto
exports.cadastrarProjeto = (req, res) => {
  const { titulo, descricao, status, data_inicio, data_termino, id_empresa } = req.body;

  // Validação simples
  if (!titulo || !status || !data_inicio || !data_termino || !id_empresa) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios!' });
  }

  const sql = 'INSERT INTO projetos (título, descrição, status, data_inicio, data_termino, id_empresa) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(sql, [titulo, descricao, status, data_inicio, data_termino, id_empresa], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar projeto:', err);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar projeto' });
    }
    res.status(201).json({ mensagem: 'Projeto cadastrado com sucesso!', id: result.insertId });
  });
};

// Controlador para deletar um projeto
exports.deletarProjeto = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM projetos WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar projeto:', err);
      return res.status(500).json({ mensagem: 'Erro ao deletar projeto' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Projeto não encontrado' });
    }

    res.json({ mensagem: 'Projeto deletado com sucesso' });
  });
};

