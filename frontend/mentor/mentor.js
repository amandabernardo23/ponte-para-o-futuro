function abrirFormulario(idProjetoHtml, tituloProjeto) {
  const container = document.querySelector(`#formulario-${idProjetoHtml}`);

  if (!container) {
    const div = document.createElement('div');
    div.id = `formulario-${idProjetoHtml}`;
    div.className = 'formulario-reuniao';
    div.innerHTML = `
      <h3>${tituloProjeto}</h3>
      <label>Data:</label>
      <input type="date" id="data-${idProjetoHtml}">
      <label>Hora:</label>
      <input type="time" id="hora-${idProjetoHtml}">
      <label>Link do Google Meet:</label>
      <input type="url" id="link-${idProjetoHtml}" placeholder="https://meet.google.com/...">
      <button onclick="enviarConvite('${idProjetoHtml}', ${idProjetoHtml.replace('projeto', '')})">Enviar</button>
    `;
    const linha = document.querySelector(`#linha-${idProjetoHtml}`);
    linha.insertAdjacentElement('afterend', div);
  }

  fetch(`https://ponte-para-o-futuro-production.up.railway.app/api/reunioes/alunos/${idProjetoHtml.replace('projeto', '')}`)
    .then(res => res.json())
    .then(data => {
      console.log("Resposta recebida da API:", data);  // <-- Adicione aqui
      const alunos = data.map(obj => obj.id_aluno);
    });
}

function enviarConvite(idProjeto) {
  const data = document.getElementById(`data-${idProjeto}`).value;
  const hora = document.getElementById(`hora-${idProjeto}`).value;
  const link = document.getElementById(`link-${idProjeto}`).value;
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const idMentor = usuario?.id;

  if (!data || !hora || !link) {
    alert("Preencha todos os campos!");
    return;
  }

  const dataHora = `${data} ${hora}`;
  const alunos = window.alunosDoProjeto?.[idProjeto] || [];

  if (alunos.length === 0) {
    alert("Nenhum aluno vinculado ao projeto.");
    return;
  }

  const reunioes = alunos.map(idAluno => ({
    id_mentor: idMentor,
    id_projeto: idProjeto,
    id_aluno: idAluno,
    data_hora: dataHora,
    link_reuniao: link
  }));

  fetch("https://ponte-para-o-futuro-production.up.railway.app/api/reunioes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reunioes)
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao enviar.");
      return res.json();
    })
    .then(() => {
      alert("Reunião agendada com sucesso!");
      document.getElementById(`formulario-${idProjeto}`).remove(); // remove formulário se quiser
    })
    .catch(err => {
      console.error(err);
      alert("Erro ao agendar reunião.");
    });
}

// Function para carregar os projetos
function carregarProjetos() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const usuarioId = usuarioLogado?.id;

  // Verifica se o usuário está logado e tem um ID
  if (!usuarioId) {
    console.error('Erro: Usuário não logado ou ID não encontrado.');
    alert('Por favor, faça login novamente.');
    window.location.href = 'login.html';
    return;
  }

  fetch('https://ponte-para-o-futuro-production.up.railway.app/api/projetos')
    .then(res => {
      if (!res.ok) {
        throw new Error('Erro ao buscar projetos: ' + res.status);
      }
      return res.json();
    })
    .then(projetos => {
      const tabela = document.getElementById('tabela-projetos');
      tabela.innerHTML = ''; // Limpa a tabela

     if (projetos.length === 0) {
        tabela.innerHTML = `<tr><td colspan="6">Nenhum projeto encontrado.</td></tr>`;
        return;
      }

      projetos.forEach(p => {
        const linha = document.createElement('tr');
        linha.id = `linha-projeto${p.id}`;
        linha.innerHTML = `
          <td>${p.id}</td>
          <td>${p.titulo}</td>
          <td>${p.descricao}</td>
          <td>${p.status}</td>
          <td>${new Date(p.data_inicio).toLocaleDateString()}</td>
          <td>${new Date(p.data_termino).toLocaleDateString()}</td>
          <td>
          <button id="btn-mentorar-${p.id}" onclick="mentorarProjeto(${p.id}, '${p.titulo}')">Mentorar</button>
          </td>
        `;
        tabela.appendChild(linha);
      });
    })
    .catch(erro => {
      console.error('Erro ao buscar projetos:', erro);
      alert('Erro ao carregar projetos. Tente novamente.');
    });
}

function enviarConvite(idProjetoHtml, idProjeto) {
  const data = document.getElementById(`data-${idProjetoHtml}`).value;
  const hora = document.getElementById(`hora-${idProjetoHtml}`).value;
  const link = document.getElementById(`link-${idProjetoHtml}`).value;
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const idMentor = usuario?.id;

  if (!data || !hora || !link) {
    alert('Preencha todos os campos.');
    return;
  }

  const dataHora = `${data} ${hora}`;

  const reunioes = window.alunosDoProjeto.map(idAluno => ({
    id_mentor: idMentor,
    id_projeto: idProjeto,
    id_aluno: idAluno,
    data_hora: dataHora,
    link_reuniao: link
  }));

  fetch('https://ponte-para-o-futuro-production.up.railway.app/api/reunioes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reunioes)
  })
  .then(res => {
    if (!res.ok) throw new Error('Erro ao enviar');
    return res.json();
  })
  .then(() => {
    alert('Reunião agendada com sucesso!');
    document.getElementById(`formulario-${idProjetoHtml}`).remove(); // opcional: remove o formulário
  })
  .catch(err => {
    console.error('Erro:', err);
    alert('Erro ao agendar reunião.');
  });
}

function mentorarProjeto(idProjeto, titulo) {
  console.log('ID do projeto recebido:', idProjeto);
  // Salvar localmente para persistência
  let mentorados = JSON.parse(localStorage.getItem('projetosMentorados')) || [];
  if (!mentorados.includes(idProjeto)) {
    mentorados.push(idProjeto);
    localStorage.setItem('projetosMentorados', JSON.stringify(mentorados));
  }

  // Desabilitar o botão
  const botao = document.getElementById(`btn-mentorar-${idProjeto}`);
  if (botao) {
    botao.disabled = true;
    botao.textContent = "Mentorando";
  }

  // Buscar alunos vinculados ao projeto
  fetch(`https://ponte-para-o-futuro-production.up.railway.app/api/reunioes/alunos/${idProjeto}`)
    .then(res => res.json())
    .then(data => {
      const alunos = data.map(obj => obj.id);
      window.alunosDoProjeto = window.alunosDoProjeto || {};
      window.alunosDoProjeto[idProjeto] = alunos;

      // Criar o card de agendamento
      const reuniaoSection = document.getElementById("reunioes-projetos");
      const container = document.createElement("div");
      container.className = "reuniao-card";

      container.innerHTML = `
        <div class="projeto-card">
          <h3>${titulo}</h3>
          <p><strong>Alunos vinculados (IDs):</strong> ${alunos.join(", ")}</p>
        </div>
        <div class="formulario-reuniao" id="formulario-${idProjeto}">
          <label>Data:</label>
          <input type="date" id="data-${idProjeto}">
          
          <label>Hora:</label>
          <input type="time" id="hora-${idProjeto}">
          
          <label>Link do Google Meet:</label>
          <input type="url" id="link-${idProjeto}" placeholder="https://meet.google.com/...">
          
          <button onclick="enviarConvite(${idProjeto})">Agendar Reunião</button>
        </div>
      `;
      reuniaoSection.appendChild(container);
    })
    .catch(err => {
      console.error("Erro ao buscar alunos:", err);
      alert("Erro ao buscar alunos do projeto.");
    });
}

window.onload = function () {
  carregarProjetos();
};