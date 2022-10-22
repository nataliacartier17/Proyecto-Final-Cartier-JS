let arrayCompra = [];
if(arrayCompra = JSON.parse(localStorage.getItem('Productos')) == null) {
    arrayCompra = [];
}
else {
    arrayCompra = JSON.parse(localStorage.getItem('Productos'));
}

async function recolectarDatos() {
    try {
        let respuesta = await fetch("./listado.json");
        let datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}
recolectarDatos().then((datos) => {
    crearCards(datos),
    genero(datos)
});

function crearCards(datos){
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
    if (datos.length > 0){
    datos.map(elemento => {
        contenedor.innerHTML +=
    `<div class="col">
    <div class="card">
        <img src="${elemento.portada}" class="card-img-top" alt="kenzoaquea">
        <div class="card-body">
            <h5 class="card-title">${elemento.producto}</h5>
            <p>${elemento.genero}</p>
            <p>$${elemento.precio}</p>
            <button data-id=${elemento.id} type="button" class="btn btn-secondary">Comprar</button>
        </div>
    </div>
</div>
    `
    })}
    
    btnComprar(datos)
}
function btnComprar(datos) {
    let btnproductos = document.querySelectorAll(".btn-secondary");
    for (const elemento of btnproductos) { 
    elemento.addEventListener("click", (evento) => {
        let arrayCompra = [];
    if(arrayCompra = JSON.parse(localStorage.getItem('Productos')) == null) {
    arrayCompra = [];
    }
    else {
    arrayCompra = JSON.parse(localStorage.getItem('Productos'));        
    }
        let id = evento.target.dataset.id;
        let busqueda = datos.find(elemento => elemento.id == id);
        if(!busqueda.cantidad) {
            busqueda.cantidad = 1;
        }
        let encontrar = arrayCompra.find(elemento => elemento.id == id);
        if(encontrar) {
            encontrar.cantidad ++;
            console.log(arrayCompra);
        }
        else {
            arrayCompra.push(busqueda);
        }
        localStorage.setItem("Productos", JSON.stringify(arrayCompra))
    } )
    }
}

function genero(datos) {
    let btnGenero = document.querySelectorAll(".genero");
    for (const btn of btnGenero) {
        btn.addEventListener("click", (evento) => {
            let genero = evento.target.dataset.genero.toLowerCase();
            let resultado = datos.filter(el => el.genero.toLowerCase().includes(genero));
            crearCards(resultado);
        })
        
    }
}
