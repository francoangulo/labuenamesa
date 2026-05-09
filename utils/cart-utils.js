export function getCart() {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const existingIndex = cart.findIndex((item) => item.id === product.id);

  if (existingIndex > -1) {
    cart[existingIndex].cantidad += 1;
  } else {
    cart.push({ ...product, cantidad: 1 });
  }

  saveCart(cart);
  updateCartBadge();
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart();
  const newCart = cart.filter((item) => item.id !== productId);
  saveCart(newCart);
  updateCartBadge();
  return newCart;
}

export function updateCartItemQuantity(productId, cantidad) {
  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex > -1) {
    if (cantidad <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].cantidad = cantidad;
    }
    saveCart(cart);
  }

  updateCartBadge();
  return cart;
}

export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.cantidad, 0);
}

export function clearCart() {
  localStorage.removeItem("cart");
  updateCartBadge();
}

export function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  const count = getCartCount();

  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

export function renderCartDropdown() {
  const cart = getCart();
  const container = document.querySelector(".cart-dropdown-content");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-dropdown-empty">
        <span class="cart-empty-icon">🛒</span>
        <p>Tu carrito está vacío</p>
        <a href="menu.html" class="btn btn-primary btn-small">Ver menú</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="cart-dropdown-items">
      ${cart
        .map(
          (item) => `
        <div class="cart-dropdown-item" data-id="${item.id}">
          <span class="cart-item-emoji">${item.imagen}</span>
          <div class="cart-item-info">
            <span class="cart-item-name">${item.nombre}</span>
            <span class="cart-item-qty">Cantidad: ${item.cantidad}</span>
          </div>
          <span class="cart-item-price">$${(
            item.precio * item.cantidad
          ).toFixed(2)}</span>
          <button class="cart-item-remove" data-id="${
            item.id
          }" aria-label="Eliminar">×</button>
        </div>
      `
        )
        .join("")}
    </div>
    <div class="cart-dropdown-footer">
      <div class="cart-dropdown-total">
        <span>Total</span>
        <span class="cart-total-price">$${getCartTotal().toFixed(2)}</span>
      </div>
      <a href="checkout.html" class="btn btn-primary btn-small">Finalizar pedido</a>
    </div>
  `;

  container.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      removeFromCart(id);
      renderCartDropdown();
    });
  });
}

export function initCartDropdown() {
  const cartBtn = document.querySelector(".cart-icon-btn");
  const dropdown = document.querySelector(".cart-dropdown");

  if (!cartBtn || !dropdown) return;

  cartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");
    if (dropdown.classList.contains("active")) {
      renderCartDropdown();
    }
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !cartBtn.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
}
