import { renderNormalTags } from "./utils/productos.js";
import { addToCart } from "./utils/cart-utils.js";

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderIngredients(ingredientes) {
  if (!ingredientes || ingredientes.length === 0) return "";
  return `
    <div class="product-detail-ingredients">
      <h3>Ingredientes</h3>
      <ul class="ingredients-list">
        ${ingredientes.map((ing) => `<li class="ingredient-item">${ing}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderProductDetail(product) {
  return `
    <div class="product-detail-visual">
      <div class="product-detail-image">${product.imagen}</div>
      ${renderNormalTags(product.tags)}
    </div>
    <div class="product-detail-info">
      <h1>${product.nombre}</h1>
      <p class="product-detail-description">${product.descripcion_larga || product.descripcion}</p>
      ${renderIngredients(product.ingredientes)}
      <span class="product-detail-price">$${product.precio.toFixed(2)}</span>
      <div class="product-detail-actions">
        <div class="quantity-selector">
          <button class="quantity-btn" data-action="decrease" aria-label="Decrease quantity">-</button>
          <span class="quantity-value">1</span>
          <button class="quantity-btn" data-action="increase" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn-primary add-to-cart-btn">
          Agregar al pedido
        </button>
      </div>
    </div>
  `;
}

async function loadProduct() {
  try {
    const productId = getProductId();
    if (!productId) {
      window.location.href = "index.html";
      return;
    }

    const response = await fetch("productos.json");
    const products = await response.json();
    const product = products.find((p) => p.id === parseInt(productId));

    const container = document.querySelector("#product-detail-content");

    if (!product) {
      container.innerHTML = "<p>Producto no encontrado</p>";
      return;
    }

    container.innerHTML = renderProductDetail(product);
    document.title = `${product.nombre} - La Buena Mesa`;

    let quantity = 1;
    const quantityValue = container.querySelector(".quantity-value");
    const decreaseBtn = container.querySelector('[data-action="decrease"]');
    const increaseBtn = container.querySelector('[data-action="increase"]');
    const addBtn = container.querySelector(".add-to-cart-btn");

    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
      }
    });

    increaseBtn.addEventListener("click", () => {
      quantity++;
      quantityValue.textContent = quantity;
    });

    addBtn.addEventListener("click", () => {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      alert(`${product.nombre} agregado al carrito!`);
    });
  } catch (error) {
    console.error("Error loading product:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProduct);
