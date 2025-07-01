 document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dummyjson.com/products?limit=12")
    .then(res => res.json())
    .then(data => mostrarProductos(data.products));

  actualizarContador();
});

function mostrarProductos(productos) {
  const container = document.getElementById("productos-container");

  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
      <img src="${p.thumbnail}" alt="${p.title}" width="100">
      <h3>${p.title}</h3>
      <p>$${p.price}</p>
      <button onclick="agregarAlCarrito('${p.title.replace(/'/g, "\\'")}', ${p.price})">Agregar al carrito</button>
    `;
    container.appendChild(card);
  });
}

function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const existente = carrito.find(p => p.nombre === nombre);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);
  const contador = document.getElementById("cart-count");
  if (contador) contador.textContent = totalItems;
}
function vaciarCarrito() {
  if (confirm("¿Estás seguro de que querés vaciar el carrito?")) {
    localStorage.removeItem("carrito");
    actualizarContador();
    alert("Carrito vaciado.");
  }
}