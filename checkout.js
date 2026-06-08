import {
  clearCart,
  getCart,
  getCartTotal,
  saveCart,
  updateCartBadge,
} from "./utils/cart-utils.js";

function renderCheckoutItems() {
  const container = document.getElementById("checkout-items");
  if (!container) return;

  const cartItems = getCart();

  if (cartItems.length === 0) {
    container.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    return;
  }

  container.innerHTML = cartItems
    .map(
      (item, index) => `
    <div class="checkout-item">
      <img class="checkout-item-img" src="${item.imagen}" alt="${item.nombre}" />
      <div class="checkout-item-details">
        <h3>${item.nombre}</h3>
        <p>Cantidad: ${item.cantidad}</p>
      </div>
      <div class="checkout-item-price">$${(item.precio * item.cantidad).toFixed(
        2
      )}</div>
      <button class="remove-item" data-index="${index}" data-id="${
        item.id
      }" aria-label="Eliminar">×</button>
    </div>
  `
    )
    .join("");

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      removeItem(id);
    });
  });
}

function removeItem(productId) {
  const cart = getCart();
  const newCart = cart.filter((item) => item.id !== productId);
  saveCart(newCart);
  renderCheckoutItems();
  updateTotal();
  updateCartBadge();
}

function updateTotal() {
  const totalElement = document.getElementById("checkout-total");
  if (totalElement) {
    totalElement.textContent = `$${getCartTotal().toFixed(2)}`;
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const cartItems = getCart();
  if (cartItems.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  const formData = new FormData(e.target);
  const orderData = {
    nombre: formData.get("nombre"),
    telefono: formData.get("telefono"),
    direccion: formData.get("direccion"),
    notas: formData.get("notas"),
    metodoPago: formData.get("pago"),
    items: cartItems,
    total: getCartTotal(),
  };

  console.log("Pedido confirmado:", orderData);

  alert("¡Pedido confirmado! Gracias por tu compra.");

  clearCart();
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutItems();
  updateTotal();

  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});
