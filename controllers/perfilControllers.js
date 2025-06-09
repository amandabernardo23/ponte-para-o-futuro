const db = require('../config/database')

exports.salvarPerfil = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId;
    const { idade, instituicao, formacao, descricao } = req.body;
    const foto = req.file ? req.file.filename : null;

    // Verifica se já existe perfil
    const [rows] = await db.query('SELECT id FROM perfis WHERE usuario_id = ?', [usuarioId]);

    if (rows.length > 0) {
      // Atualiza perfil existente
      await db.query(
        `UPDATE perfis SET idade = ?, instituicao = ?, formacao = ?, descricao = ?, foto_perfil = ? WHERE usuario_id = ?`,
        [idade, instituicao, formacao, descricao, foto, usuarioId]
      );
    } else {
      // Insere novo perfil
      await db.query(
        `INSERT INTO perfis (usuario_id, idade, instituicao, formacao, descricao, foto_perfil) VALUES (?, ?, ?, ?, ?, ?)`,
        [usuarioId, idade, instituicao, formacao, descricao, foto]
      );
    }

    res.status(200).json({ mensagem: 'Perfil salvo com sucesso.' });
  } catch (erro) {
    console.error('Erro ao salvar perfil:', erro);
    res.status(500).json({ erro: 'Erro ao salvar perfil.' });
  }
};


// Buscar perfil com nome do usuário
exports.buscarPerfil = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    // Junta dados de usuarios (nome, email) com dados de perfis
    const [rows] = await db.query(`
      SELECT 
        u.nome,
        p.idade,
        p.instituicao,
        p.formacao,
        p.descricao,
        p.foto_perfil AS foto
      FROM usuarios u
      LEFT JOIN perfis p ON u.id = p.usuario_id
      WHERE u.id = ?
    `, [usuarioId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
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

  db.query(sql, [usuarioId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar projetos:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar projetos' });
    }
    res.json(results);
  });
};