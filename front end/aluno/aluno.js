document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });

  // Exemplo: ação ao clicar em "Visualizar etapas"
  const viewButtons = document.querySelectorAll(".view-button");
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("Visualização de etapas ainda em desenvolvimento.");
    });
  });

  // Exemplo: ação ao clicar em "Sair"
  const logoutButton = document.querySelector(".btn-sair");
  logoutButton.addEventListener("click", () => {
    const confirmLogout = confirm("Deseja realmente sair?");
    if (confirmLogout) {
      window.location.href = "index.html"; // ajuste conforme a página inicial
    }
  });
});

async function carregarProjetos() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const alunoId = usuarioLogado?.id;

  if (!alunoId) {
    alert("Erro: aluno não logado.");
    return;
  }

  try {
    // Buscar todos os projetos disponíveis
    const projetosRes = await fetch('http://localhost:3000/api/projetos');
    const projetos = await projetosRes.json();

    // Buscar os projetos que o aluno já solicitou ou foi aprovado
    const solicitadosRes = await fetch(`http://localhost:3000/api/solicitacoes/projetos-solicitados/${alunoId}`);
    const solicitados = await solicitadosRes.json();

    // Criar um mapa de projetos solicitados ou aprovados
    const mapaSolicitados = {};
    solicitados.forEach(s => {
      mapaSolicitados[s.projeto_id] = s.status; // ex: { 1: "pendente", 3: "aprovado" }
    });

    const tabela = document.getElementById('tabela-projetos');
    tabela.innerHTML = '';

    projetos.forEach(p => {
      const statusSolicitacao = mapaSolicitados[p.id];
      let botaoHtml = '';

      if (statusSolicitacao === 'aprovado') {
      botaoHtml = `<button disabled>Já participa</button>`;
    } else if (statusSolicitacao === 'solicitado') {
      botaoHtml = `<button disabled>Solicitado</button>`;
    } else if (statusSolicitacao === 'negado') {
      botaoHtml = `<button disabled>Negado</button>`;
    } else {
      botaoHtml = `<button onclick="solicitarAcesso(${p.id}, this)">Solicitar Acesso</button>`;
    }

      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${p.id}</td>
        <td>${p.titulo}</td>
        <td>${p.descricao}</td>
        <td>${p.status || 'Disponível'}</td>
        <td>${new Date(p.data_inicio).toLocaleDateString()}</td>
        <td>${new Date(p.data_termino).toLocaleDateString()}</td>
        <td>${botaoHtml}</td>
      `;
      tabela.appendChild(linha);
    });
  } catch (erro) {
    console.error('Erro ao carregar projetos:', erro);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarProjetos();
  carregarMeusProjetos();
});

//Function para solicitar o acesso ao projeto
function solicitarAcesso(projetoId, botao) {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const alunoId = usuarioLogado.id;
  if (!alunoId || alunoId === 'undefined' || alunoId === 'null') {
    alert('Erro: ID do aluno não encontrado.');
    return;
  }

  fetch('http://localhost:3000/api/solicitacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ aluno_id: parseInt(alunoId), projeto_id: projetoId })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.mensagem || 'Solicitação enviada com sucesso!');
      if (botao) {
        botao.disabled = true;
        botao.textContent = "Solicitado";
      }
    })
    .catch(err => {
      console.error('Erro ao solicitar acesso:', err);
      alert('Erro ao enviar solicitação.');
    });
}
// Function para carregar os projetos vinculados ao id do aluno
function carregarMeusProjetos() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const alunoId = usuarioLogado.id;

  if (!alunoId) {
    alert("Aluno não identificado.");
    return;
  }

  fetch(`http://localhost:3000/api/solicitacoes/projetos-do-aluno?alunoId=${alunoId}`)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar projetos.");
      return response.json();
    })
    .then(projetos => {
      const tabela = document.getElementById("tabela-meus-projetos");
      tabela.innerHTML = ""; // Limpa qualquer linha existente

      if (projetos.length === 0) {
        tabela.innerHTML = `<tr><td colspan="4">Nenhum projeto encontrado.</td></tr>`;
        return;
      }

      projetos.forEach(projeto => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
          <td>${projeto.titulo}</td>
          <td>${projeto.descricao}</td>
          <td>${projeto.status}</td>
          <td>${projeto.mensagem_resposta || "—"}</td>
        `;

        tabela.appendChild(linha);
      });
    })
    .catch(erro => {
      console.error("Erro ao carregar projetos:", erro);
      alert("Erro ao carregar projetos.");
    });
}
