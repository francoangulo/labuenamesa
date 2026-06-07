import { login } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = form.usuario.value;
    const password = form.password.value;

    if (usuario === "admin" && password === "admin") {
      login();
      window.location.href = "index.html";
    } else {
      alert("Credenciales incorrectas. Usa admin/admin");
    }
  });
});
