const pool = require('../config/database');

// Salvar ou atualizar perfil
exports.salvarPerfil = (req, res) => {
  const usuarioId = req.params.usuarioId;
  const { nome, curso, instituicao, descricao } = req.body;

  console.log('Requisição recebida:', req.params, req.body);

  // Verifica se o perfil já existe
  pool.query('SELECT id FROM perfis WHERE usuario_id = ?', [usuarioId], (err, result) => {
    if (err) {
      console.error('Erro ao verificar perfil:', err);
      return res.status(500).json({ erro: 'Erro ao verificar perfil.' });
    }

    if (result.length > 0) {
      // Atualiza perfil existente
      const sqlUpdate = `
        UPDATE perfis 
        SET nome = ?, curso = ?, instituicao = ?, descricao = ?
        WHERE usuario_id = ?
      `;

      pool.query(sqlUpdate, [nome, curso, instituicao, descricao, usuarioId], (err) => {
        if (err) {
          console.error('Erro ao atualizar perfil:', err);
          return res.status(500).json({ erro: 'Erro ao atualizar perfil.' });
        }
        res.status(200).json({ mensagem: 'Perfil atualizado com sucesso.' });
      });
    } else {
      // Insere novo perfil
      const sqlInsert = `
        INSERT INTO perfis (nome, curso, instituicao, descricao, usuario_id)
        VALUES (?, ?, ?, ?, ?)
      `;

      pool.query(sqlInsert, [nome, curso, instituicao, descricao, usuarioId], (err) => {
        if (err) {
          console.error('Erro ao criar perfil:', err);
          return res.status(500).json({ erro: 'Erro ao criar perfil.' });
        }
        res.status(200).json({ mensagem: 'Perfil criado com sucesso.' });
      });
    }
  });
};

// Buscar perfil
exports.buscarPerfil = (req, res) => {
  const { usuarioId } = req.params;

  const sql = `
    SELECT 
      u.nome AS nome_usuario,
      p.nome,
      p.curso,
      p.instituicao,
      p.descricao
    FROM usuarios u
    LEFT JOIN perfis p ON u.id = p.usuario_id
    WHERE u.id = ?
  `;

  pool.query(sql, [usuarioId], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar perfil:', err);
      return res.status(500).json({ error: 'Erro ao buscar perfil.' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(rows[0]);
  });
};

// Controller para listar projetos do usuário logado
exports.listarProjetos = (req, res) => {
  const usuarioId = req.query.usuarioId;

  if (!usuarioId) {
    return res.status(400).json({ mensagem: "Usuário não informado" });
  }

  const sql = `
    SELECT id, titulo AS titulo, descricao AS descricao, status, data_inicio, data_termino
    FROM projetos
    WHERE id_universidade = ?
  `;

  pool.query(sql, [usuarioId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar projetos:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar projetos' });
    }
    res.json(results);
  });
};