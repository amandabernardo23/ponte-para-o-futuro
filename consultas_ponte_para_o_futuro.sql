-- Consulta para listar todos os usuários
SELECT * FROM usuarios;
-- Consulta para listar todos os projetos
SELECT * FROM projetos;
-- Consulta para listar todas as candidaturas
SELECT * FROM candidaturas;
-- Consulta para listar todos os mentores cadastrados 
SELECT * FROM usuarios WHERE tipo = 'mentor';
-- Consulta para listar todos os alunos cadastrados 
SELECT * FROM usuarios WHERE tipo = 'aluno';
-- Consulta para listar todas as empresas cadastradas 
SELECT * FROM usuarios WHERE tipo = 'empresa';
