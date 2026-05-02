const AUTH_KEY = 'isLoggedIn'

export function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export function login() {
  localStorage.setItem(AUTH_KEY, 'true')
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
}

export function initAuthNav() {
  const navLinks = document.querySelector('.nav-links')
  if (!navLinks) return

  const agregarPlatoLink = navLinks.querySelector('a[href="agregar-plato.html"]')
  const authItem = document.createElement('li')
  authItem.className = 'auth-nav-item'

  function renderAuth() {
    authItem.innerHTML = ''
    if (isLoggedIn()) {
      agregarPlatoLink.style.display = ''
      const avatarBtn = document.createElement('button')
      avatarBtn.className = 'avatar-btn'
      avatarBtn.textContent = '👤'
      avatarBtn.title = 'Usuario'
      
      const dropdown = document.createElement('div')
      dropdown.className = 'auth-dropdown'
      
      const logoutBtn = document.createElement('button')
      logoutBtn.className = 'logout-btn'
      logoutBtn.textContent = 'Cerrar sesión'
      logoutBtn.addEventListener('click', () => {
        logout()
        renderAuth()
      })
      
      dropdown.appendChild(logoutBtn)
      
      avatarBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        dropdown.classList.toggle('active')
      })
      
      document.addEventListener('click', () => {
        dropdown.classList.remove('active')
      })
      
      authItem.appendChild(avatarBtn)
      authItem.appendChild(dropdown)
    } else {
      agregarPlatoLink.style.display = 'none'
      const loginBtn = document.createElement('a')
      loginBtn.href = 'login.html'
      loginBtn.className = 'nav-link-login'
      loginBtn.textContent = 'Iniciar sesión'
      authItem.appendChild(loginBtn)
    }
  }

  renderAuth()

  const navContainer = document.querySelector('.nav-container')
  if (navContainer) {
    navContainer.appendChild(authItem)
  }
}
