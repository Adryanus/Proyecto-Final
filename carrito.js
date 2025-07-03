document.addEventListener("DOMContentLoaded", () => {
  const carritoContainer = document.getElementById("carrito-container");
  const totalElement = document.getElementById("total");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    totalElement.textContent = "";
    return;
  }

const gridContainer = document.createElement("div");
gridContainer.classList.add("carrito-grid");
carritoContainer.appendChild(gridContainer);


carrito.forEach((p, index) => {
  const item = document.createElement("div");
  item.classList.add("carrito-item");
  item.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}">
    <p><strong>${p.nombre}</strong></p>
    <p>$${p.precio.toFixed(2)}</p>
    <p>Cantidad: ${p.cantidad}</p>
    <button class="eliminar-item" data-index="${index}">Eliminar 1</button>
  `;
  gridContainer.appendChild(item);
});


// Agregar listeners a los botones de eliminar
document.querySelectorAll(".eliminar-item").forEach(boton => {
  boton.addEventListener("click", () => {
    const index = parseInt(boton.dataset.index);

    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
    } else {
      carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    location.reload();
  });
});

  
  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
  totalElement.textContent = `Total: $${total.toFixed(2)}`;

  
  const botonesContainer = document.createElement("div");
  botonesContainer.classList.add("botones-carrito");

  
  const botonVaciar = document.createElement("button");
  botonVaciar.textContent = "Vaciar carrito";
  botonVaciar.classList.add("vaciar-carrito");
  botonVaciar.addEventListener("click", () => {
    const confirmar = confirm("¿Estás seguro de que querés vaciar el carrito?");
    if (confirmar) {
      localStorage.removeItem("carrito");
      location.reload();
    }
  });


  const botonFinalizar = document.createElement("button");
  botonFinalizar.textContent = "Finalizar compra";
  botonFinalizar.classList.add("finalizar-compra");
  botonFinalizar.addEventListener("click", () => {
    const confirmar = confirm("¿Querés finalizar la compra?");
    if (confirmar) {
      localStorage.setItem("compraFinalizada", JSON.stringify({
        carrito: carrito,
        total: total.toFixed(2)
      }));
      localStorage.removeItem("carrito");
      window.location.href = "gracias.html";
    }
  });

 
  botonesContainer.appendChild(botonVaciar);
  botonesContainer.appendChild(botonFinalizar);
  totalElement.appendChild(botonesContainer);
});




