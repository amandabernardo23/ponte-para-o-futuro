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

let usuarioLogado = null;// define global

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
            usuarioLogado = data.usuario;
            //// Salva no localStorage para acesso em outras páginas
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado)); 
            localStorage.setItem("instituicaoNome", usuarioLogado.nome);
            localStorage.setItem("tipoUsuario", usuarioLogado.tipo);


            alert(`Bem-vindo(a), ${usuarioLogado.nome}!`);
            aposLogin (); //chama aposLogin após definir usuarioLogado
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
  if (typeof btnLogin !== "undefined" && btnLogin) btnLogin.style.display = "none";
  if (typeof btnRegister !== "undefined" && btnRegister) btnRegister.style.display = "none";
  if (typeof btnLogout !== "undefined" && btnLogout) btnLogout.style.display = "inline-block";

  if (usuarioLogado.tipo === "aluno") {
    if (typeof btnProjects !== "undefined" && btnProjects) btnProjects.style.display = "inline-block";
    if (typeof btnDashboard !== "undefined" && btnDashboard) btnDashboard.style.display = "inline-block";
    if (typeof btnSubmitProject !== "undefined" && btnSubmitProject) btnSubmitProject.style.display = "none";
    mostrarSecao("projects");
  } else if (usuarioLogado.tipo === "instituicao") {
    window.location.href = "instituicao.html";
  }
}
//Tive que modificar essa function pois como esse botões não existem no login.html, tava quebrando antes de redirecionar pra outra página.
  
  document.addEventListener("DOMContentLoaded", () => {

 const ativarLogin = criarLoginHandler("http://localhost:3000/api/users/login"); 
 ativarLogin();

 const ativarRegistro = criarRegistroHandler("http://localhost:3000/api/users");
  ativarRegistro();

});