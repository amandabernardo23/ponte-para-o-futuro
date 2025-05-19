require('dotenv').config();
require('./config/database'); //Importando o banco de dados para conexão

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

app.use(cors()); // Adiciona o middleware CORS para permitir requisições de outros domínios
app.use(express.json()); // Utilizei esse comando para que o Express entenda o corpo da requisição em JSON. Antes disso o servidor estava entendendo como "undefined".

// Importando as rotas
const usersRoutes = require('./routes/users');
const projetosRoutes = require('./routes/projetos')
const universidadeRoutes = require('./routes/universidades');


// Rota simples para testar
app.get('/', (req, res) => {
  res.send('O Servidor Express está funcionando!');
});

//Rotas
app.use('/api/users', usersRoutes);
app.use('/api/projetos', projetosRoutes);
app.use('/universidades', universidadeRoutes);


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

