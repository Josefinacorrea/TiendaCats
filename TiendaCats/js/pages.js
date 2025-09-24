document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'home' || page === 'productos') renderProductsGrid();
  if (page === 'producto') renderProductDetail();
  if (page === 'carrito') renderCart();
  if (page === 'login') initLogin();
  if (page === 'registro') initRegister();
  if (page === 'blog') renderBlog();
  document.addEventListener('cart:updated', () => {
    const el = document.getElementById('cart-count');
    if (el) el.textContent = Cart.getCount();
  });
});

function renderProductsGrid() {
  const list = document.getElementById('products-grid');
  if (!list) return;
  list.innerHTML = '';
  APP_DATA.products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="p">
        <h3>${p.name}</h3>
        <div class="price">${toCLP(p.price)}</div>
        <div class="mt-2">
          <a class="btn" href="producto.html?id=${p.id}">Ver detalle</a>
          <button class="btn secondary mt-2" data-add="${p.id}">Añadir</button>
        </div>
      </div>`;
    list.appendChild(card);
  });
  list.addEventListener('click', (e) => {
    const id = e.target.dataset.add && Number(e.target.dataset.add);
    if (!id) return;
    const prod = APP_DATA.products.find(x => x.id === id);
    Cart.add(prod, 1);
    document.dispatchEvent(new Event('cart:updated'));
  });
}

function renderProductDetail() {
  const id = Number(qs('id'));
  const p = APP_DATA.products.find(x => x.id === id);
  const box = document.getElementById('product-detail');
  if (!box) return;
  if (!p) {
    box.innerHTML = `<div class="form">Producto no encontrado.</div>`;
    return;
  }
  box.innerHTML = `
    <div class="grid" style="grid-template-columns:300px 1fr;gap:20px">
      <img src="${p.image}" alt="${p.name}" style="width:100%;height:auto;border-radius:12px">
      <div>
        <h2>${p.name}</h2>
        <div class="mt-2 price">${toCLP(p.price)}</div>
        <p class="mt-3">${p.desc}</p>
        <div class="mt-4">
          <button id="btn-add" class="btn">Añadir al carrito</button>
        </div>
      </div>
    </div>`;
  document.getElementById('btn-add').addEventListener('click', () => {
    Cart.add(p, 1);
    document.dispatchEvent(new Event('cart:updated'));
    alert('Añadido al carrito');
  });
}

function renderCart() {
  const tbody = document.querySelector('#cart-table tbody');
  const totalEl = document.getElementById('cart-total');
  const empty = document.getElementById('cart-empty');
  const rows = Cart.getItems();
  if (!rows.length) {
    empty.style.display = 'block';
    document.getElementById('cart-table').style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td><img src="${r.image}" alt="" style="width:60px;height:40px;object-fit:cover;border-radius:8px"></td>
      <td>${r.name}</td>
      <td>${toCLP(r.price)}</td>
      <td><input data-id="${r.id}" class="qty" type="number" min="1" value="${r.qty}" style="width:70px"></td>
      <td>${toCLP(r.price * r.qty)}</td>
      <td><button class="btn secondary" data-del="${r.id}">X</button></td>
    </tr>`).join('');
  totalEl.textContent = toCLP(Cart.getTotal());

  tbody.addEventListener('input', (e) => {
    if (e.target.classList.contains('qty')) {
      const id = Number(e.target.dataset.id);
      Cart.setQty(id, Number(e.target.value || 1));
      renderCart();
      document.dispatchEvent(new Event('cart:updated'));
    }
  });
  tbody.addEventListener('click', (e) => {
    const id = e.target.dataset.del && Number(e.target.dataset.del);
    if (!id) return;
    Cart.remove(id);
    renderCart();
    document.dispatchEvent(new Event('cart:updated'));
  });
  document.getElementById('btn-clear').addEventListener('click', () => {
    Cart.clear(); renderCart(); document.dispatchEvent(new Event('cart:updated'));
  });
}

function initLogin() {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const email = form.email.value.trim().toLowerCase();
    const pass  = form.password.value;
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    const ok = users.find(u => u.email===email && u.password===pass);
    if (ok) { localStorage.setItem('session', JSON.stringify(ok)); alert('Bienvenido'); location.href='index.html'; }
    else alert('Credenciales inválidas');
  });
}
function initRegister() {
  const form = document.getElementById('register-form');
  form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const user = {
      name: form.name.value.trim(),
      email: form.email.value.trim().toLowerCase(),
      password: form.password.value
    };
    if (!user.name || !user.email || !user.password) return alert('Completa todos los campos');
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    if (users.some(u=>u.email===user.email)) return alert('Ese correo ya existe');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registrado con éxito'); location.href='login.html';
  });
}

function renderBlog() {
  const list = document.getElementById('blog-list');
  list.innerHTML = APP_DATA.blog.map(p => `
    <article class="card">
      <div class="p">
        <div class="badge">${p.date}</div>
        <h3 class="mt-2">${p.title}</h3>
        <p class="mt-2">${p.excerpt}</p>
      </div>
    </article>`).join('');
}
