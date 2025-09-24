window.Cart = (function () {
  const KEY = "cart";

  function _read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }
  function _write(cart) { localStorage.setItem(KEY, JSON.stringify(cart)); }

  function add(product, qty = 1) {
    const cart = _read();
    const idx = cart.findIndex(i => i.id === product.id);
    if (idx >= 0) cart[idx].qty += qty;
    else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
    _write(cart);
    return getCount();
  }

  function remove(id) {
    const cart = _read().filter(i => i.id !== id);
    _write(cart);
  }

  function setQty(id, qty) {
    const cart = _read();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, qty|0);
    _write(cart);
  }

  function clear() { _write([]); }

  function getItems() { return _read(); }

  function getCount() {
    return _read().reduce((acc, i) => acc + i.qty, 0);
  }

  function getTotal() {
    return _read().reduce((acc, i) => acc + i.price * i.qty, 0);
  }

  return { add, remove, setQty, clear, getItems, getCount, getTotal };
})();
