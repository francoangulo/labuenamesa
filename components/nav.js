export function renderNav() {
  const navHTML = `
    <nav>
      <a href="index.html" class="logo">La Buena Mesa</a>
      <button class="nav-toggle" aria-label="Menú">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-links">
        <li><a href="index.html">Inicio</a></li>
        <li><a href="menu.html">Menú</a></li>
        <li><a href="#contact">Contacto</a></li>
        <li>
          <a href="agregar-plato.html" class="nav-link-primary"
            >Agregar plato</a
          >
        </li>
      </ul>
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

  import("../auth.js").then((module) => {
    module.initAuthNav();
  });
}
