card.classList.add('product-card');
card.innerHTML = `
<img src="${product.image}" alt="${product.name}">
<h3>${product.name}</h3>
<p>$${product.price.toLocaleString('es-CL')}</p>
<button onclick="addToCart(${product.id})">Añadir al carrito</button>
`;
productsGrid.appendChild(card);




function handleContactForm(event) {
event.preventDefault();
const form = event.target;
const nombre = form.nombre.value.trim();
const correo = form.correo.value.trim();
const comentario = form.comentario.value.trim();
const emailRegex = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
let isValid = true;
document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
if (nombre === '') {
document.getElementById('nombre-error').textContent = 'El nombre es requerido.';
isValid = false;
} else if (nombre.length > 100) {
document.getElementById('nombre-error').textContent = 'El nombre no debe exceder los 100 caracteres.';
isValid = false;
}
if (correo !== '' && !emailRegex.test(correo)) {
document.getElementById('correo-error').textContent = 'Correo inválido. Solo se permiten dominios de duoc.cl, profesor.duoc.cl y gmail.com.';
isValid = false;
} else if (correo.length > 100) {
document.getElementById('correo-error').textContent = 'El correo no debe exceder los 100 caracteres.';
isValid = false;
}
if (comentario === '') {
document.getElementById('comentario-error').textContent = 'El comentario es requerido.';
isValid = false;
} else if (comentario.length > 500) {
document.getElementById('comentario-error').textContent = 'El comentario no debe exceder los 500 caracteres.';
isValid = false;
}
if (isValid) {
alert('¡Mensaje enviado con éxito!');
form.reset();
}
}


document.addEventListener('DOMContentLoaded', () => {
renderProducts();
updateCartCount();
const contactForm = document.getElementById('contact-form');
if (contactForm) {
contactForm.addEventListener('submit', handleContactForm);
}
});