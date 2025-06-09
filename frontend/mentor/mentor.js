function abrirFormulario(projetoId) {
  document.getElementById(`formulario-${projetoId}`).style.display = 'block';
  window.open('https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=now&hl=pt-PT', '_blank');
}

async function enviarConvite(projetoId) {
  const data = document.getElementById(`data-${projetoId}`).value;
  const hora = document.getElementById(`hora-${projetoId}`).value;
  const link = document.getElementById(`link-${projetoId}`).value;

  await fetch('/enviar-convite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projetoId, data, hora, link })
  });

  alert('Convite enviado aos alunos!');
}

async function carregarMensagens() {
  const res = await fetch('/api/mensagens');
  const mensagens = await res.json();
  const container = document.getElementById('mensagens');
  container.innerHTML = '';

  mensagens.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('mensagem', msg.remetente === 'mentor' ? 'mentor' : 'aluno');
    div.textContent = msg.texto;
    container.appendChild(div);
  });

  container.scrollTop = container.scrollHeight;
}

async function enviarMensagem(event) {
  event.preventDefault();
  const input = document.getElementById('mensagem');
  const texto = input.value;
  await fetch('/api/mensagens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto, remetente: 'mentor' }) // ou 'aluno'
  });
  input.value = '';
  carregarMensagens();
}

//Function para agendar reuniões
function enviarConvite(idProjetoHtml, idAluno) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const id_mentor = usuario.id; // ou usuario.id_usuario, dependendo da sua estrutura

  const id_projeto = parseInt(idProjetoHtml.replace('projeto', ''));

  const data = document.getElementById(`data-${idProjetoHtml}`).value;
  const hora = document.getElementById(`hora-${idProjetoHtml}`).value;
  const link = document.getElementById(`link-${idProjetoHtml}`).value;

  const reuniao = {
    id_mentor,
    id_projeto,
    id_aluno: idAluno,
    data,
    hora,
    link_reuniao: link
  };

  fetch('https://ponte-para-o-futuro-production.up.railway.app/reunioes/agendar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reuniao)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.mensagem || 'Reunião agendada com sucesso!');
    // (opcional) fechar formulário, atualizar tela etc.
  })
  .catch(err => {
    console.error('Erro ao agendar:', err);
    alert('Erro ao agendar reunião.');
  });
}

setInterval(carregarMensagens, 3000); // atualiza a cada 3s
carregarMensagens(); // carrega inicialmente
