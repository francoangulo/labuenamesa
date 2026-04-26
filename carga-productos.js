import { renderAbsoluteTags, renderNormalTags } from "./utils/productos.js";

function renderProduct(product) {
  return `
    <a href="detalle-producto.html?id=${product.id}" class="menu-item-link">
      <article class="menu-item">
        <div class="menu-item-image">${product.imagen}</div>
        ${renderAbsoluteTags(product.tags)}
        <div class="menu-item-info">
          ${renderNormalTags(product.tags)}
          <h3>${product.nombre}</h3>
          <p>${product.descripcion}</p>
          <span class="menu-item-price">$${product.precio.toFixed(2)}</span>
        </div>
      </article>
    </a>
  `;
}

async function loadProducts() {
  try {
    const response = await fetch("productos.json");
    const products = await response.json();
    const container = document.querySelector(".menu-grid");

    if (container) {
      container.innerHTML = products.map(renderProduct).join("");
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);
