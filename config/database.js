const mysql = require('mysql2');
require("dotenv").config();

// Pool de conexões para evitar erros de conexão fechada
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.connect((err) => {
    if (err) {
      console.error('Erro de conexão:', err.stack);
      return;
    }
    console.log('Conectado ao banco de dados');
  });

module.exports = pool;
