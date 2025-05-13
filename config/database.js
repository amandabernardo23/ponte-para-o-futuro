const mysql = require('mysql2');
require("dotenv").config();

// Conexão com o banco de dados 
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,//senha do banco hospedado no Railway
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
      console.error('Erro de conexão:', err.stack);
      return;
    }
    console.log('Conectado ao banco de dados');
  });

  module.exports = db;