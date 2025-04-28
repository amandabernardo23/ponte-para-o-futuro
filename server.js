const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware para parsing do corpo da requisição em JSON
app.use(express.json());

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

// Rota simples para testar
app.get('/', (req, res) => {
  res.send('Servidor Express está funcionando!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Rota para consultar todos os projetos
app.get('/api/projetos', (req, res) => {
    const sql = 'SELECT * FROM projetos'; // Consulta SQL para buscar todos os projetos
  
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send('Erro ao consultar projetos');
      } else {
        res.json(result); // Retorna os resultados em formato JSON
      }
    });
  });
  app.post('/api/cadastro_projetos', (req, res) => {
    const { título, descrição, data_inicio, data_termino, nome_empresa } = req.body;
  
    // Insere o novo projeto na tabela
    const sql = 'INSERT INTO cadastro_projetos (título, descrição, data_inicio, data_termino, nome_empresa) VALUES (?, ?, ?, ?, ?)';
  
    db.query(sql, [título, descrição, data_inicio, data_termino, nome_empresa], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar projeto:', err);
        return res.status(500).send('Erro ao cadastrar projeto');
      } else {
        console.log('Projeto cadastrado com sucesso');
        return res.status(201).send('Projeto cadastrado com sucesso');
      }
    });
  });
  
  
  
  