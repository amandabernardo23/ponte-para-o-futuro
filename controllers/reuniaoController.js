const Reuniao = require('../models/reuniao');

exports.criarReuniao = (req, res) => {
  const { id_mentor, id_projeto, id_aluno, data, hora, link_reuniao } = req.body;

  const data_hora = `${data} ${hora}`;

  const novaReuniao = {
    id_mentor,
    id_projeto,
    id_aluno,
    data_hora,
    link_reuniao
  };

  Reuniao.criar(novaReuniao, (err, resultado) => {
    if (err) {
      console.error('Erro ao criar reunião:', err);
      return res.status(500).json({ erro: 'Erro ao agendar reunião.' });
    }

    res.status(201).json({ mensagem: 'Reunião agendada com sucesso!' });
  });
};

// Listar alunos vinculados a um projeto
exports.listarAlunosDoProjeto = (req, res) => {
  const { id_projeto } = req.params;

  const sql = `
    SELECT u.id, u.nome, u.email
    FROM alunos_projetos pa
    JOIN usuarios u ON pa.id_aluno = u.id
    WHERE pa.id_projeto = ?
  `;

  pool.query(sql, [id_projeto], (err, results) => {
    if (err) {
      console.error('Erro ao buscar alunos:', err);
      return res.status(500).json({ error: 'Erro ao buscar alunos do projeto' });
    }
    res.json(results);
  });
};
