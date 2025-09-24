(function () {
  window.toCLP = (n) => `$${(n||0).toLocaleString('es-CL')}`;

  function headerHTML(active = "") {
    const nav = (href, text, key) =>
      `<li><a class="${active===key?'active':''}" href="${href}">${text}</a></li>`;
    return `
<header>
  <nav class="container">
    <a class="logo" href="index.html" style="display:flex;align-items:center;gap:8px">
      <img src="images/logo.jpg" alt="logo" style="width:32px;height:32px;border-radius:50%">
      <span>Gatitos.com</span>
    </a>
    <ul class="nav-menu">
      ${nav('index.html','Inicio','home')}
      ${nav('productos.html','Productos','productos')}
      ${nav('blog.html','Blog','blog')}
      ${nav('nosotros.html','Nosotros','nosotros')}
      ${nav('login.html','Login','login')}
      ${nav('registro.html','Registro','registro')}
    </ul>
    <a class="cart" href="carrito.html">🛒 Carrito (<span id="cart-count">0</span>)</a>
  </nav>
</header>`;
  }

  const footerHTML = `
<footer>
  <div class="container">&copy; 2024 Gatitos.com. Todos los derechos reservados.</div>
</footer>`;

  window.renderShell = function (active) {
    const root = document.body;
    root.insertAdjacentHTML('afterbegin', headerHTML(active));
    root.insertAdjacentHTML('beforeend', footerHTML);
    const el = document.getElementById('cart-count');
    if (el && window.Cart) el.textContent = Cart.getCount();
  };

  window.qs = (key) => new URLSearchParams(location.search).get(key);
})();
