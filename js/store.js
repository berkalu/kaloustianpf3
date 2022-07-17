// Array JSON
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let almacenJSON = [];
// DOM
let carroRender = document.getElementById("carroContenedor");
let catalogo = document.getElementById("productosOrdenados");
let finalizar = document.getElementById("finalizar");
let carroContenedor = document.getElementById("modalCompras");
let botonVaciar = document.getElementById('vaciar-carrito')

// Pantalla cargada
window.onload = () => {
    getJSON();
    showCarrito();
    document.getElementById("ordenar").setAttribute("option", "pordefecto");
    document.getElementById("ordenar").onchange = () => ordenarCatalogo();
}

// Mostramos catalogo
function showCatalogo(){
    for (const prod of almacenJSON){
            catalogo.innerHTML += 
            `<div class="productos__1">
            <div class="productos__img">
                <img src="${prod.foto}">
            </div>
            <article class="cardtxt">
                <p>${prod.nombre}</p>
            </article>
            <div class="cardbtn">
                <button id="btn${prod.id}" class="btn">COMPRAR ${prod.precio}</button>
            </div>
        </div>`
    }
    // Evento agregar al carrito
    almacenJSON.forEach( prod => {
        document.getElementById(`btn${prod.id}`).onclick = function(){
            addCarrito(prod);
        };
    });
}

// Ordenamos Productos por precio
function ordenarCatalogo(){
    let opcion = document.getElementById("ordenar").value;
    if (opcion == "menor") {
        almacenJSON.sort(function(a, b) {
            return a.precio - b.precio
        });
    } else if (opcion == "mayor") {
        almacenJSON.sort(function(a, b) {
            return b.precio - a.precio
        });
    } 
    catalogo.innerHTML="";
    showCatalogo();
}

// Mostramos los productos en el carrito y el total gastado
function showCarrito(){
    carroRender.innerHTML = "";
    for (const prod of carrito){
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML =
                `<div class="item item${prod.id}">
                    <img src="${prod.foto}" alt="" loading="lazy">
                    <div class="item--info">
                        <h5>${prod.nombre}</h5>
                        <h5 id="${prod.id}">x${prod.cantidad}</h5>
                        <h5>$${prod.precio} c/u</h5>
                        <button class="removeFromCart" onclick='removeCarrito(${prod.id})'">ELIMINAR</i></button>
                    </div>
                </div>`
        carroRender.appendChild(div)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    document.getElementById("total").innerText = (`TOTAL: $ ${getTotal()}`);
}

// Constructor
class products {
    constructor(item) {
        this.id = item.id;
        this.foto = item.foto;
        this.nombre = item.nombre;
        this.precio = item.precio;
        this.cantidad = 1;
    }
}

// Funcion para agregar al carrito
function addCarrito(item){
    // Si existe
    let found = carrito.find(p => p.id == item.id);
    // Si no existe
    if (found == undefined){
        // Se agrega
        let newItem = new products(item);
        carrito.push(newItem);
        carroRender.innerHTML +=
                `<div class="item item${newItem.id}">
                <img src="${newItem.foto}" alt="" loading="lazy">
                <div class="item--info">
                    <h5>${newItem.nombre}</h5>
                    <h5 id="${newItem.id}">x${newItem.cantidad}</h5>
                    <h5>$${newItem.precio} c/u</h5>
                    <button class="removeFromCart" onclick='removeCarrito(${newItem.id})'">ELIMINAR</button>
                </div>
            </div>`
    }
    // Aumentamos cantidad del mismo producto
    else{
        let index = carrito.findIndex(p => p.id == item.id);
        carrito[index].cantidad += 1;
        document.getElementById(item.id).innerHTML = "x" + carrito[index].cantidad;
    }
    // Se cambia el total
    document.getElementById("total").innerText = (`Total: $ ${getTotal()}`);
    localStorage.setItem("carrito", JSON.stringify(carrito))
    Swal.fire({
        icon: 'success',
        title: 'AGREGADO AL CARRITO !',
        text: 'Hace click en el carrito para ver tus compras !',
        imageUrl: item.foto,
        imageWidth: 300,
        imageHeight: 300,
        text: 'Producto: '+item.nombre,
});
}

// Funcion suma total
function getTotal(){
    let total = 0;
    for (const item of carrito){
        total += (item.precio * item.cantidad);
    }
    return total;
}

// Funcion para eliminar del carrito
function removeCarrito(id){
    // Buscamos el indice
    let index = carrito.findIndex( item => item.id == id);
    let prodMsg = carrito[index].nombre;
    // Si hay mas de un productos eliminamos de a uno
    if(carrito[index].cantidad > 1){
        carrito[index].cantidad -= 1;
    }
    // Y si hay solo uno, se elimina el item completo
    else{
        carrito.splice(index, 1);
    }
    showCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// Obtenemos productos desde JSON
async function getJSON() {
    const URLJSON="/almacen.json"
    const resp=await fetch("almacen.json")
    const data= await resp.json()
    almacenJSON = data;
    showCatalogo();
}

// Funciones para poder mostrar u ocultar el carro de compras

let btnCarrito = document.getElementById("botonCarrito");
btnCarrito.onclick = function (){
    carroContenedor.className = "visible";
};
let btnCerrar = document.getElementById("carritoCerrar");
btnCerrar.onclick = function (){
    carroContenedor.className = "hidden";
};

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    showCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito))
})

// Ir a Pagar
let payButton = document.getElementById("pay");
payButton.onclick = function (){
    if (getTotal() == 0){
        Swal.fire({
            icon: 'error',
            title: 'ALGO ESTA MAL...',
            text: 'No agregaste ningun producto a tu carrito !'
        })
    }
    else{
        carroContenedor.className = "hidden";
        finalizar.className = "visible";
        let btnCerrarM = document.getElementById("modalCerrar");
        btnCerrarM.onclick = function (){
            finalizar.className = "hidden";
        };
    }
};



