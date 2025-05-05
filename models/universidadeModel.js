const db = require('../config/database');

// Função para cadastrar a universidade
exports.criar = (nome, email, senha, callback) => {
  const sql = 'INSERT INTO universidades (nome, email, senha) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, senha], callback);
};

// Função para buscar universidade por email
exports.buscarPorEmail = (email, callback) => {
  const sql = 'SELECT * FROM universidades WHERE email = ?';
  db.query(sql, [email], callback);
};

// Funçao para listar as universidades cadastradas
exports.listar = (callback) => {
  const sql = 'SELECT id, nome, email FROM universidades';
  db.query(sql, callback);
};

// Funçao para atualizar cadastro das universidades
exports.atualizar = (id, nome, email, senha, callback) => {
  const sql = 'UPDATE universidades SET nome = ?, email = ?, senha = ? WHERE id = ?';
  db.query(sql, [nome, email, senha, id], callback);
};

// Funçao para deletar o cadastro das universidades
exports.deletar = (id, callback) => {
  const sql = 'DELETE FROM universidades WHERE id = ?';
  db.query(sql, [id], callback);
};

