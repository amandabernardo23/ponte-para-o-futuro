const mysql = require('mysql2');

// Conexão com o banco de dados 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Wan72364', // senha do banco MySQL
  database: 'ponte_para_o_futuro'
});

db.connect((err) => {
    if (err) {
      console.error('Erro de conexão:', err.stack);
      return;
    }
    console.log('Conectado ao banco de dados');
  });

  module.exports = db;