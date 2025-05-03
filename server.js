const express = require('express');
const app = express();
const port = 3000;

//Importando o banco de dados para conexão
require('./config/database');

// Importando as rotas
const usersRoutes = require('./routes/users');
const projetosRoutes = require('./routes/projetos')

// Utilizei esse comando para que o Express entenda o corpo da requisição em JSON. Antes disso o servidor estava entendendo como "undefined".
app.use(express.json());

// Rota simples para testar
app.get('/', (req, res) => {
  res.send('O Servidor Express está funcionando!');
});

//Rotas
app.use('/api/users', usersRoutes);
app.use('/api/projetos', projetosRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});