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
  const logoutButton = document.querySelector(".logout");
  logoutButton.addEventListener("click", () => {
    const confirmLogout = confirm("Deseja realmente sair?");
    if (confirmLogout) {
      window.location.href = "index.html"; // ajuste conforme a página inicial
    }
  });
});
