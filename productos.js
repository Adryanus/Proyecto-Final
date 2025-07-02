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
  mostrarCarrito();
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
      <button onclick="agregarAlCarrito('${p.title.replace(/'/g, "\\'")}', ${p.price},'${p.thumbnail}')">Agregar al carrito</button>
    `;

    container.appendChild(card);
  });
}


function agregarAlCarrito(nombre, precio,imagen) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const existente = carrito.find(p => p.nombre === nombre);

  if (existente) {
  existente.cantidad++;
  } else {
  carrito.push({ nombre, precio, imagen, cantidad: 1 });
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
function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;
  } else {
    carrito.splice(index, 1); 
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  mostrarCarrito();
}


function vaciarCarrito() {
  if (confirm("¿Estás seguro de que querés vaciar el carrito?")) {
    localStorage.removeItem("carrito");
    actualizarContador();
    alert("Carrito vaciado.");
  }
}
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoContainer = document.getElementById("carrito-container");

  if (!carritoContainer) return; 

  carritoContainer.innerHTML = "";

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  carrito.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "carrito-item";
    itemDiv.innerHTML = `
      <span>${item.nombre}</span>
      <span>Cantidad: ${item.cantidad}</span>
      <span>Precio: $${item.precio}</span>
      <span>Subtotal: $${(item.precio * item.cantidad).toFixed(2)}</span>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    carritoContainer.appendChild(itemDiv);
  });

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const totalDiv = document.createElement("div");
  totalDiv.className = "carrito-total";
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  carritoContainer.appendChild(totalDiv);

  const vaciarBtn = document.createElement("button");
  vaciarBtn.textContent = "Vaciar Carrito";
  vaciarBtn.onclick = vaciarCarrito;
  carritoContainer.appendChild(vaciarBtn);

  const finalizarBtn = document.createElement("button");
finalizarBtn.textContent = "Finalizar compra";
finalizarBtn.onclick = finalizarCompra;
carritoContainer.appendChild(finalizarBtn);

}
