import { addToCart, renderCartDropdown } from "./utils/cart-utils.js";
import { renderAbsoluteTags, renderNormalTags } from "./utils/productos.js";
import { getProducts } from "./services/supabase.js";

function renderProduct(product) {
  return `
    <article class="menu-item">
      <a href="detalle-producto.html?id=${product.id}" class="menu-item-link">
        <div class="menu-item-image"><img src="${product.imagen}" alt="${product.nombre}" /></div>
        ${renderAbsoluteTags(product.tags)}
        <div class="menu-item-info">
          ${renderNormalTags(product.tags)}
          <h3>${product.nombre}</h3>
          <p>${product.descripcion}</p>
          <span class="menu-item-price">$${product.precio.toFixed(2)}</span>
        </div>
      </a>
      <button class="quick-add-btn" data-product='${JSON.stringify(
        product
      )}' aria-label="Agregar al carrito">
        +
      </button>
    </article>
  `;
}

async function loadProducts() {
  try {
    const products = await getProducts();
    const container = document.querySelector(".menu-grid:not(#destacados)");
    const destacadosContainer = document.querySelector("#destacados");
    const productosDestacados = products.filter((product) =>
      product.tags.includes("featured")
    );

    if (container) {
      container.innerHTML = products.map(renderProduct).join("");
    }
    if (destacadosContainer) {
      destacadosContainer.innerHTML = productosDestacados
        .map(renderProduct)
        .join("");
    }

    document.querySelectorAll(".quick-add-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const product = JSON.parse(btn.dataset.product);
        addToCart(product);
        renderCartDropdown();
        btn.textContent = "✓";
        setTimeout(() => {
          btn.textContent = "+";
        }, 1000);
      });
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);
