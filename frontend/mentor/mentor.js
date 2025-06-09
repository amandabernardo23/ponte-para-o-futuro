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



setInterval(carregarMensagens, 3000); // atualiza a cada 3s
carregarMensagens(); // carrega inicialmente
