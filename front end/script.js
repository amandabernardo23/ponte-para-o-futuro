//Transição entre a tela de login/cadastro

let card = document.querySelector(".card")
let loginButton = document.querySelector(".loginButton")
let cadastroButton = document.querySelector(".cadastroButton")

loginButton.onclick = () => {
  card.classList.remove("cadastroActive")
  card.classList.add("loginActive")
}

cadastroButton.onclick = () => {
  card.classList.remove("loginActive")
  card.classList.add("cadastroActive")
}

//Function para criar login
function criarLoginHandler(urlLogin) {
  return function ativarLogin() {
    const formLogin = document.getElementById("form-login");
    if (!formLogin) return;

    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Formulário enviado");

      const email = formLogin["login-username"].value.trim();
      const senha = formLogin["login-password"].value;

      fetch(urlLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "login-username": email,
          "login-password": senha,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.mensagem === "Login realizado com sucesso") {
            const usuarioLogado = data.usuario;
            alert(`Bem-vindo(a), ${usuarioLogado.nome}!`);
            formLogin.reset();
            // Chame aqui qualquer função que você queira após login
            // Exemplo: aposLogin();
          } else {
            alert(data.mensagem || "Erro ao realizar login.");
          }
        })
        .catch((error) => {
          console.error("Erro ao realizar login:", error);
          alert("Erro ao conectar com o servidor.");
        });
    });
  };
}

// Factory para criar handler de registro
function criarRegistroHandler(urlRegistro) {
  return function ativarRegistro() {
    const formRegister = document.getElementById("form-register");
    if (!formRegister) return;

    formRegister.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = formRegister["register-username"].value.trim();
      const email = formRegister["register-email"].value.trim();
      const senha = formRegister["register-password"].value.trim();
      const tipo = formRegister["register-role"].value.trim();

      console.log("Username:", nome);
      console.log("Email:", email);
      console.log("Password:", senha);
      console.log("Role:", tipo);

      // Verificando se algum campo está vazio
      if (!nome || !email || !senha || !tipo) {
        alert("Preencha todos os campos.");
        return;
      }

      fetch(urlRegistro, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          tipo,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.mensagem);
          if (data.sucesso) {
            formRegister.reset();
            mostrarSecao("login"); // só funciona se você tiver essa função definida no seu script
          }
        })
        .catch((error) => {
          console.error("Erro ao registrar usuário:", error);
          alert("Erro ao registrar usuário.");
        });
    });
  };
}

// -----------------------
  // Após login
  function aposLogin() {
    // Ajusta botões conforme perfil
    btnLogin.style.display = "none";
    btnRegister.style.display = "none";
    btnLogout.style.display = "inline-block";
  
    if (usuarioLogado.role === "aluno") {
      btnProjects.style.display = "inline-block";
      btnDashboard.style.display = "inline-block";
      btnSubmitProject.style.display = "none";
      mostrarSecao("projects");
    } else if (usuarioLogado.role === "instituicao") {
      //direciona o usuário do tipo "instituição" para a página html
      window.location.href = "instituicao.html";
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {

 const ativarLogin = criarLoginHandler("http://localhost:3000/api/users/login"); 
 ativarLogin();

 const ativarRegistro = criarRegistroHandler("http://localhost:3000/api/users");
  ativarRegistro();

});