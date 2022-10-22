let arrayCompra = [];
if(arrayCompra = JSON.parse(localStorage.getItem('Productos')) == null) {
    arrayCompra = [];
}
else {
    arrayCompra = JSON.parse(localStorage.getItem('Productos'));
    console.log(arrayCompra)
}
function pintarProductos(arrayCompra) {
    let contenedor = document.getElementById("shop");
    contenedor.innerHTML = "";
    let total = 0;
    let suma = 0;
    if(arrayCompra.length > 0) {
        arrayCompra.map(elemento => {
            suma = elemento.precio * elemento.cantidad;
            total = total + suma;
            contenedor.innerHTML += 
    `<li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
    <div class="fw-bold">${elemento.producto}</div>
    Unidades: ${elemento.cantidad}
    </div>
    <span class="badge bg-secondary rounded-pill">$${suma}</span>
    <span class="badge bg-danger rounded-pill"><i class="bi bi-x-circle btn-cancelar" data-id=${elemento.id}></i></span>
    </li>`
})
    contenedor.innerHTML +=
    `
    <div class="card-footer text-muted">
        <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
        <div class="fw-bold"> Total</div>
    </div>
        <span class="badge bg-secondary rounded-pill">$${total}</span>
        </li>
    </div>
    `
    }
    else{
        contenedor.innerHTML = `<p>No hay productos seleccionados</p>`}

    btnCancelar(arrayCompra)
}

pintarProductos(arrayCompra)

function btnCancelar(arrayCompra) {
    let btnCancelar = document.querySelectorAll(".btn-cancelar");
    for (const btn of btnCancelar) {
        btn.addEventListener("click", (evento) => {
            let id = evento.target.dataset.id;
            let resultado = arrayCompra.find(elemento => elemento.id == id)
            let posicion = arrayCompra.indexOf(resultado);
            arrayCompra.splice(posicion, 1);
            localStorage.setItem("Productos", JSON.stringify(arrayCompra))
            pintarProductos(arrayCompra);
        }) 
    }
}
function btnFinalizar(arrayCompra) {
    let btnFinalizar = document.querySelectorAll(".cerrar");
    for (const btn of btnFinalizar) {
        btn.addEventListener("click", (evento) => {
            localStorage.removeItem("Productos");
            pintarProductos(arrayCompra);
            location.reload()
        })
        }
    }
    btnFinalizar(arrayCompra);
