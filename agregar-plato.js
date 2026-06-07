import { isLoggedIn } from "./auth.js";
import { insertProduct } from "./services/supabase.js";

if (!isLoggedIn()) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("platoForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const product = {
      name: formData.get("nombre"),
      description: formData.get("descripcion"),
      description_long: formData.get("descripcion_larga"),
      price: parseFloat(formData.get("precio")),
      image_url: formData.get("imagen"),
      ingredients: formData
        .get("ingredientes")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      category: formData.get("categoria"),
    };

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Guardando...";

    try {
      await insertProduct(product);
      form.reset();
      alert("¡Plato agregado exitosamente!");
    } catch (err) {
      alert("Error al guardar el plato: " + err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Guardar Plato";
    }
  });
});
