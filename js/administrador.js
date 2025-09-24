
if (code === '' || code.length < 3) {
document.getElementById('product-code-error').textContent = 'Código requerido y debe tener al menos 3 caracteres.';
isValid = false;
}


if (name === '' || name.length > 100) {
document.getElementById('product-name-error').textContent = 'Nombre requerido y no debe exceder los 100 caracteres.';
isValid = false;
}


if (description.length > 500) {
document.getElementById('product-description-error').textContent = 'La descripción no debe exceder los 500 caracteres.';
isValid = false;
}


if (isNaN(price) || price < 0) {
document.getElementById('product-price-error').textContent = 'Precio requerido y debe ser mayor o igual a 0.';
isValid = false;
}


if (isNaN(stock) || stock < 0) {
document.getElementById('product-stock-error').textContent = 'Stock requerido y debe ser un número entero mayor o igual a 0.';
isValid = false;
}


if (category === '') {
document.getElementById('product-category-error').textContent = 'Categoría requerida.';
isValid = false;
}


if (isValid) {
showAlert('Formulario de producto válido. ¡Listo para enviar!');
form.reset();
}


document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.sidebar a').forEach(link => {
link.addEventListener('click', (e) => {
e.preventDefault();
const sectionId = e.target.dataset.section;
document.querySelectorAll('main section').forEach(section => {
section.style.display = 'none';
});
document.getElementById(`${sectionId}-section`).style.display = 'block';
});
});


document.getElementById('show-add-product-form').addEventListener('click', () => {
const formContainer = document.getElementById('product-form-container');
formContainer.style.display = 'block';
});


document.getElementById('product-form').addEventListener('submit', validateProductForm);
renderProductsTable();
renderUsersTable();
populateCategorySelect();
});