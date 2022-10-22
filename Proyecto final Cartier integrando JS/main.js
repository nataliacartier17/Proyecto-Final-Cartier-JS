let usuario = "";
let visitas = 0;
let registrarse = document.getElementById("login")

registrarse.addEventListener("click", identificarUsuario)

function identificarUsuario() {
    usuario= prompt ("Ingrese su nombre para identificarse");
    localStorage.setItem ("usuario", usuario);
    registrarse.innerHTML = `Hola ${usuario} eres el visitante n° ${visitas}`;  
}

console.log(localStorage.getItem("usuario"))


addEventListener("DOMContentLoaded", contador)
function contador() {
    visitas = localStorage.getItem("visitas")
    visitas ++;
    localStorage.setItem('visitas', visitas);
}

console.log(localStorage.getItem("visitas"))