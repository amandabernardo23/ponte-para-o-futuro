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
