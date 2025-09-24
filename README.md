# 🐾 TiendaCats

TiendaCats es un proyecto de sitio web orientado a la venta de productos para gatos.  
Incluye páginas informativas, catálogo de productos, carrito de compras y más.

## 📂 Estructura del proyecto

TiendaCats/
├─ css/ # Hojas de estilo
├─ images/ # Imágenes del sitio
├─ js/ # Scripts JS
│ ├─ administrador.js # Lógica/acciones del módulo admin
│ ├─ cart.js # Carrito de compras (agregar, quitar, total)
│ ├─ common.js # Funciones compartidas (UI, helpers)
│ ├─ data.js # Datos mock (productos/usuarios) o acceso a storage
│ ├─ pages.js # Comportamiento por página (enrutado simple)
│ └─ script.js # Inicialización general
├─ blog.html # Blog / novedades
├─ carrito.html # Vista del carrito
├─ index.html # Página principal (home)
├─ login.html # Inicio de sesión
├─ nosotros.html # Sobre la tienda
├─ producto.html # Detalle de producto
├─ productos.html # Catálogo de productos
├─ registro.html # Registro de usuarios
└─ visadmin.html # Vista administrativa (panel)


---

## ✨ Funcionalidades principales

- **Catálogo** (`productos.html`) con listado y navegación a **detalle** (`producto.html`).
- **Carrito** (`carrito.html`) con manejo en **localStorage** (a través de `cart.js`).
- **Login / Registro** (`login.html`, `registro.html`) con validaciones básicas.
- **Blog** (`blog.html`) y **Nosotros** (`nosotros.html`).
- **Panel admin** (`visadmin.html`) para acciones simples de administración (ver/gestionar ítems).
- **JS modular**:
  - `data.js` centraliza datos/mock y/o persistencia.
  - `common.js` expone utilidades (render, formateos, alerts, etc.).
  - `pages.js` agrupa inicializaciones por página.
  - `script.js` hace el boot global del sitio.

> Nota: si usas `data.js` como mock, al migrar a backend solo reemplaza sus métodos por llamadas a API (fetch/axios) manteniendo las mismas firmas.

---

## 🚀 Cómo ejecutar localmente

1. Clona el repo:
   ```bash
   git clone https://github.com/Josefinacorrea/TiendaCats.git
   cd TiendaCats
