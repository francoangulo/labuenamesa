export function initFabScrollTop() {
  const fab = document.createElement("button");
  fab.className = "fab-scroll-top";
  fab.id = "fabScrollTop";
  fab.setAttribute("aria-label", "Volver arriba");
  fab.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path d="M18 15l-6-6-6 6" />
  </svg>`;

  document.body.appendChild(fab);

  window.addEventListener("scroll", () => {
    fab.classList.toggle("visible", window.scrollY > 300);
  });

  fab.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
