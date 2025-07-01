    document.addEventListener("DOMContentLoaded", () => {
      const urls = [
        "https://dummyjson.com/products/category/smartphones",
        "https://dummyjson.com/products/category/laptops"
      ];

      Promise.all(urls.map(url => fetch(url).then(res => res.json())))
        .then(results => {
          const smartphones = results[0].products.slice(0, 7);
          const laptops = results[1].products.slice(0, 5);

          const productosCombinados = [...smartphones, ...laptops];

          // Mostrar en el HTML
          mostrarProductos(productosCombinados);
        })
        .catch(error => console.error("Error al cargar los productos:", error));

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