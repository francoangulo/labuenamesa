export function renderNav() {
  const navHTML = `
    <nav>
    <div class="nav-left">
      <a href="index.html" class="logo">La Buena Mesa</a>
    </div>
    <div class="nav-middle">
      <ul class="nav-links">
        <li><a href="index.html">Inicio</a></li>
        <li><a href="menu.html">Menú</a></li>
        <li><a href="#contact">Contacto</a></li>
        <li class="nav-cart">
          <button class="cart-icon-btn" aria-label="Carrito de compras">
            <span class="cart-icon">🛒</span>
            <span class="cart-badge" style="display: none;">0</span>
          </button>
          <div class="cart-dropdown">
            <div class="cart-dropdown-content"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="nav-right">
      <ul class="nav-links">
        <li class="add-meal-btn">
          <a href="agregar-plato.html" class="nav-link-primary desktop-only"
            >Agregar plato</a
          >
        </li>
    </div>
    </nav>
  `;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = navHTML;
  const navElement = tempDiv.firstElementChild;

  document.body.insertBefore(navElement, document.body.firstChild);

  const currentPath = window.location.pathname;

  console.log("franco currentPath ", JSON.stringify(currentPath, null, 4));
  const currentPage = currentPath.endsWith("/")
    ? "index.html"
    : currentPath.split("/").pop();

  const navLinks = navElement.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (linkHref === "#") return;
    console.log("franco linkHref", JSON.stringify(linkHref, null, 4));
    const linkPage = linkHref.split("/").pop();
    console.log("franco linkPage", JSON.stringify(linkPage, null, 4));
    linkPage === currentPage
      ? link.classList.add("active")
      : link.classList.remove("active");
  });

  Promise.all([import("../auth.js"), import("../utils/cart-utils.js")])
    .then(([authModule, cartModule]) => {
      authModule.initAuthNav();
      cartModule.updateCartBadge();
      cartModule.initCartDropdown();
    })
    .catch((error) => {
      console.error("Error al cargar los módulos:", error);
    });
}

renderNav();
