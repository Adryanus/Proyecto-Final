let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = carrito.reduce((sum, item) => sum + item.precio, 0);

document.addEventListener('DOMContentLoaded', actualizarCarrito);

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    guardarCarrito();
    actualizarCarrito();
}

function eliminarItem(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de que querés vaciar el carrito?')) {
        carrito = [];
        total = 0;
        guardarCarrito();
        actualizarCarrito();
    }
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    const confirmado = confirm(`Total: USD ${total.toLocaleString()}\n¿Deseás finalizar tu compra?`);
    if (confirmado) {
        // Guardar resumen para mostrar en gracias.html
        localStorage.setItem('resumenCompra', JSON.stringify({
            carrito,
            total
        }));

        carrito = [];
        total = 0;
        guardarCarrito();
        actualizarCarrito();
        window.location.href = 'gracias.html';
    }
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');

    if (!lista || !totalElement) return; // Prevención por si este script corre en otra página

    lista.innerHTML = '';
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nombre} - USD ${item.precio.toLocaleString()} 
        <button onclick="eliminarItem(${index})">Quitar</button>`;
        lista.appendChild(li);
    });

    totalElement.textContent = `Total: USD ${total.toLocaleString()}`;
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

        document.addEventListener('DOMContentLoaded', () => {
            const resumen = JSON.parse(localStorage.getItem('resumenCompra'));
            const lista = document.getElementById('resumen-lista');
            const totalElement = document.getElementById('resumen-total');

            if (!lista || !totalElement) return; // Prevención por si este script corre en otra página

            if (resumen && resumen.carrito.length > 0) {
                resumen.carrito.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.nombre} - USD ${item.precio.toLocaleString()}`;
                    lista.appendChild(li);
                });
                totalElement.textContent = `Total abonado: USD ${resumen.total.toLocaleString()}`;
            } else {
                lista.innerHTML = '<li>No se encontraron datos de compra.</li>';
                totalElement.textContent = '';
            }

            localStorage.removeItem('resumenCompra');
        });
 