import { isLoggedIn } from "./auth.js";
import { getProducts, updateProduct } from "./services/supabase.js";

if (!isLoggedIn()) {
  window.location.href = "login.html";
}

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!productId) return;

  const form = document.getElementById("platoForm");

  try {
    const products = await getProducts();
    const product = products.find((p) => p.id === parseInt(productId));

    if (!product) {
      alert("Producto no encontrado");
      window.location.href = "index.html";
      return;
    }

    document.getElementById("nombre").value = product.nombre;
    document.getElementById("descripcion").value = product.descripcion;
    document.getElementById("descripcion_larga").value =
      product.descripcion_larga || "";
    document.getElementById("precio").value = product.precio;
    document.getElementById("imagen").value = product.imagen;
    document.getElementById("ingredientes").value = (
      product.ingredientes || []
    ).join(", ");
    document.getElementById("categoria").value = product.categoria.toLowerCase();
  } catch (err) {
    console.error("Error loading product:", err);
  }

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
      await updateProduct(productId, product);
      alert("¡Plato actualizado exitosamente!");
      window.location.href = `detalle-producto.html?id=${productId}`;
    } catch (err) {
      alert("Error al actualizar el plato: " + err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Actualizar Plato";
    }
  });
});
