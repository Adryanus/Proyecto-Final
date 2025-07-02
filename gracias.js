document.addEventListener("DOMContentLoaded", () => {
  const resumenContainer = document.getElementById("resumen-compra");
  const datosCompra = JSON.parse(localStorage.getItem("compraFinalizada"));

  if (!datosCompra) {
    resumenContainer.innerHTML = "<p>No hay datos de compra.</p>";
    return;
  }

  const { carrito, total } = datosCompra;

  if (!carrito.length) {
    resumenContainer.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  // Título inicial
  const mensajeEnvio = document.createElement("h2");
  mensajeEnvio.textContent = "Su pedido será enviado en los próximos días";
  resumenContainer.appendChild(mensajeEnvio);

  // Subtítulo
  const tituloCompra = document.createElement("h3");
  tituloCompra.textContent = "SU COMPRA:";
  resumenContainer.appendChild(tituloCompra);

  // Contenedor grid
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-compra");
  resumenContainer.appendChild(gridContainer);

  // Productos
  carrito.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("producto-comprado");
    item.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <p><strong>${p.nombre}</strong></p>
      <p>Precio: $${p.precio.toFixed(2)}</p>
      <p>Cantidad: ${p.cantidad}</p>
      <p>Subtotal: $${(p.precio * p.cantidad).toFixed(2)}</p>
    `;
    gridContainer.appendChild(item);
  });

  // Total
  const totalElement = document.createElement("p");
  totalElement.innerHTML = `<strong>Total de la compra: $${parseFloat(total).toFixed(2)}</strong>`;
  totalElement.style.textAlign = "right";
  totalElement.style.marginTop = "20px";
  totalElement.style.fontSize = "1.1em";
  resumenContainer.appendChild(totalElement);

  // Limpiar datos
  localStorage.removeItem("compraFinalizada");
});


