 document.addEventListener("DOMContentLoaded", () => {
    const carritoContainer = document.getElementById("carrito-container");
    const totalElement = document.getElementById("total");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
        totalElement.textContent = "Total: $0";
        return;
    }

    let total = 0;

    carrito.forEach(producto => {
        const item = document.createElement("div");
        item.className = "producto-carrito";
        item.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <hr>
        `;
        carritoContainer.appendChild(item);
        total += producto.precio * producto.cantidad;
    });

    totalElement.textContent = `Total: $${total}`;
});
