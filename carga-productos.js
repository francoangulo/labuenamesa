import { getProducts } from "./services/supabase.js";
import { addToCart, renderCartDropdown } from "./utils/cart-utils.js";
import {
  renderAbsoluteTags,
  renderNormalTags,
  TAG_CONFIG,
  FILTERABLE_TAGS,
} from "./utils/productos.js";

let allProducts = [];
let activeCategory = "Destacados";
let searchQuery = "";
const selectedTags = new Set();

function renderProduct(product) {
  return `
    <article class="menu-item">
      <a href="detalle-producto.html?id=${product.id}" class="menu-item-link">
        <div class="menu-item-image"><img src="${product.imagen}" alt="${
    product.nombre
  }" /></div>
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

function getFilteredProducts() {
  let filtered = allProducts;

  if (activeCategory === "Destacados") {
    filtered = filtered.filter((p) => p.tags.includes("featured"));
  } else if (activeCategory !== "Todos") {
    filtered = filtered.filter(
      (p) => p.categoria?.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  if (selectedTags.size > 0) {
    filtered = filtered.filter((p) =>
      p.tags.some((t) => selectedTags.has(t))
    );
  }

  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.ingredientes.some((i) => i.toLowerCase().includes(q)) ||
        p.descripcion_larga.toLowerCase().includes(q)
    );
  }

  return filtered;
}

function renderProducts(products) {
  const container = document.querySelector(".menu-grid");
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML =
      '<p class="loading-text">No se encontraron productos.</p>';
    return;
  }

  container.innerHTML = products.map(renderProduct).join("");

  container.querySelectorAll(".quick-add-btn").forEach((btn) => {
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
}

function applyFilters() {
  renderProducts(getFilteredProducts());
}

function setupCategoryFilters() {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.textContent.trim();
      applyFilters();
    });
  });
}

function setupSearch() {
  const input = document.querySelector(".search-input");
  if (!input) return;
  input.addEventListener("input", () => {
    searchQuery = input.value;
    applyFilters();
  });
}

function renderTagFilters() {
  const container = document.querySelector(".tag-filters");
  if (!container) return;

  container.innerHTML = FILTERABLE_TAGS.map((key) => {
    const tag = TAG_CONFIG[key];
    if (!tag) return "";
    const active = selectedTags.has(key) ? "active" : "";
    return `<button class="tag-filter-btn ${active}" data-tag="${key}">${tag.emoji} ${tag.text}</button>`;
  }).join("");
}

function setupTagFilters() {
  renderTagFilters();

  const sidebar = document.querySelector(".filter-sidebar");
  const toggle = document.querySelector(".filter-sidebar-toggle");
  if (toggle && sidebar) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }

  document.querySelector(".tag-filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".tag-filter-btn");
    if (!btn) return;

    const tag = btn.dataset.tag;
    if (selectedTags.has(tag)) {
      selectedTags.delete(tag);
      btn.classList.remove("active");
    } else {
      selectedTags.add(tag);
      btn.classList.add("active");
    }
    applyFilters();
  });
}

async function loadProducts() {
  try {
    allProducts = await getProducts();
    setupCategoryFilters();
    setupSearch();
    setupTagFilters();
    applyFilters();
  } catch (error) {
    console.error("Error loading products:", error);
    const container = document.querySelector(".menu-grid");
    if (container) {
      container.innerHTML =
        '<p class="loading-text">Error al cargar los productos. Intente de nuevo más tarde.</p>';
    }
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);
