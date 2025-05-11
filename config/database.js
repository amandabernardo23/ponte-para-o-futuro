const mysql = require('mysql2');

// Conexão com o banco de dados 
const db = mysql.createConnection({
   host: 'caboose.proxy.rlwy.net',
  user: 'root',
  password: 'QTRiYxwKeMYmiWzlXXnNUnxFUMKYROWt',//senha do banco hospedado no Railway
  database: 'railway',
  port: 50541
});

db.connect((err) => {
    if (err) {
      console.error('Erro de conexão:', err.stack);
      return;
    }
    console.log('Conectado ao banco de dados');
  });

  module.exports = db;