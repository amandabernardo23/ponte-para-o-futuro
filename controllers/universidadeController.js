const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Universidade = require('../models/universidadeModel');

const SECRET = process.env.JWT_SECRET || 'ponte-secreta';

const universidadeController = {
  cadastrar: async (req, res) => {
    const { nome, email, senha } = req.body;

    const hash = await bcrypt.hash(senha, 10);
    Universidade.criar(nome, email, hash, (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao cadastrar universidade' });
      res.status(201).json({ mensagem: 'Universidade cadastrada com sucesso!' });
    });
  },

  login: (req, res) => {
    const { email, senha } = req.body;

    Universidade.buscarPorEmail(email, async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      const universidade = results[0];
      const senhaValida = await bcrypt.compare(senha, universidade.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Senha incorreta' });
      }

      const token = jwt.sign({ id: universidade.id, tipo: 'universidade' }, SECRET, { expiresIn: '1d' });
      res.json({ mensagem: 'Login realizado com sucesso', token });
    });
  }
};

module.exports = universidadeController;

