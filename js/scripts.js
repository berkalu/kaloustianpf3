let carrito = JSON.parse(localStorage.getItem("carrito"))||[];
let almacen = [];
let prodDom = document.getElementById("mainProductos");


function imprimirProductos() {
    //renderizamos los productos 
    console.log(almacen)
    for (const prod of almacen) {
        prodDom.innerHTML+=(`
            <div class="productos__1">
                <div class="productos__img">
                    <img src="${prod.img}">
                </div>
                <article class="cardtxt">
                    <p>${prod.nombre}</p>
                </article>
                <div class="cardbtn">
                    <button id="agregar${prod.id}" class="boton_precio">COMPRAR ${prod.precio}</button>
                </div>
            </div>   
            `);
    }
    //EVENTOS
    almacen.forEach(prod=> {
         //Evento para cada boton
        document.getElementById(`agregar${prod.id}`).onclick= function() {
            agregarCarrito(prod);
        };
    });
}

class productoEnCarrito {
    constructor(ProdLit) {
        this.id = ProdLit.id;
        this.img = ProdLit.img;
        this.nombre = ProdLit.nombre;
        this.precio = ProdLit.precio;
        this.stock = ProdLit.stock;
        this.cantidad = 1;
    }
}

function agregarCarrito(productoNew) {
    let buscado = carrito.find(p => p.id == productoNew.id);
    console.log(buscado);
    if (buscado == undefined) {
        let prodAlCarrito = new productoEnCarrito(productoNew);
        carrito.push(prodAlCarrito);
        console.log(carrito);
        Swal.fire({
            icon: 'success',
            title: 'AGREGADO AL CARRITO !',
            imageUrl: productoNew.img,
            imageWidth: 300,
            imageHeight: 300,
            text: 'Producto: '+productoNew.nombre,
        });
        document.getElementById("tablabody").innerHTML+=(`
            <tr id='fila${prodAlCarrito.id}'>
            <td> ${prodAlCarrito.id} </td>
            <td> ${prodAlCarrito.nombre}</td>
            <td id='${prodAlCarrito.id}'> ${prodAlCarrito.cantidad}</td>
            <td> ${prodAlCarrito.precio}</td>
            <td> <button class='btn btn-light' onclick='eliminar(${prodAlCarrito.id})'>🗑️</button>`);
    } else {
        let posicion = carrito.findIndex(p => p.id == productoNew.id);
        console.log(posicion);
        carrito[posicion].cantidad += 1;
        document.getElementById(productoNew.id).innerHTML=carrito[posicion].cantidad;
    }
    document.getElementById("precioProducto").innerText=(`Total: $ ${calcularTotal()}`);
    localStorage.setItem("carrito",JSON.stringify(carrito));
}


async function getJSON() {
    const srcJSON="/productos.json"
    const resp=await fetch("productos.json")
    const data= await resp.json()
    almacen = data;
    imprimirProductos();
}
getJSON();
// // array

// let arrayTortas = [
// {
//     id: 1,
//     img: "img/marquise.jpg",
//     nombre: "Marquise",
//     precio: 2600,
//     stock: 3
// },
// {
//     id: 2,
//     img: "img/tfrutilla.jpg", 
//     nombre: "Tarta de frutillas",
//     precio: 2900,
//     stock: 4
// },
// {
//     id: 3,
//     img: "img/tcoco.jpg",
//     nombre: "Tarta de Coco",
//     precio: 2400,
//     stock: 2
// },
// {
//     id: 4,
//     img: "img/tborracha.jpg",
//     nombre: "Torta Borracha",
//     precio: 3100,
//     stock: 1
// },
// {
//     id: 5,
//     img: "img/echocolate.jpg",
//     nombre: "Explosion de Chocolate",
//     precio: 3300,
//     stock: 2
// },
// {
//     id: 6,
//     img: "img/thelada.jpg",
//     nombre: "Torta Helada",
//     precio: 2750,
//     stock: 3
// },
// {
//     id: 7,
//     img: "img/cabsha.jpg",
//     nombre: "Tarta Cabsha",
//     precio: 2500,
//     stock: 4
// },
// {
//     id: 8,
//     img: "img/hpascua.jpg",
//     nombre: "Huevos de Pascua",
//     precio: 1600,
//     stock: 0
// }
// ];

// const contenedorCarrito = document.getElementById('carrito-contenedor');
// let productosSection = document.getElementById('mainProductos');
// const precioTotal = document.getElementById('precioTotal'); 

// let carrito = []

// // guardamos el carrito en storage
// document.addEventListener('DOMContentLoaded', () => {
//     if (localStorage.getItem('carrito')){
//         carrito = JSON.parse(localStorage.getItem('carrito'))
//         productoCarrito()
//     }
// })

// arrayTortas.forEach((productos) => {
//     const div = document.createElement("div")
//     div.innerHTML += `
//     <div class="productos__1">
//         <div class="productos__img">
//             <img src="${productos.img}">
//         </div>
//         <article class="cardtxt">
//             <p>${productos.nombre}</p>
//         </article>
//         <div class="cardbtn">
//             <button id="agregar${productos.id}" class="boton_precio">COMPRAR ${productos.precio}</button>
//         </div>
//     </div>   
//     `
//     productosSection.appendChild(div)

// // Funcion boton
//     const botonComprar = document.getElementById(`agregar${productos.id}`)

//     botonComprar.addEventListener('click', () => {
//         agregarCarrito(productos.id)
//     })
// })

// // funcion agregar
// const agregarCarrito = (agregarId) => {
//     const item = arrayTortas.find((prod) => prod.id === agregarId)
//     carrito.push(item)
//     productoCarrito()
//     Swal.fire({
//         icon: 'success',
//         title: 'AGREGADO AL CARRITO !',
//         imageUrl: item.img,
//         imageWidth: 300,
//         imageHeight: 300,
//         text: 'Producto: '+item.nombre,
//     });
//     console.log(carrito)
// }


// // eliminar item

// const eliminarDelCarrito = (borrarId) => {
//     const item = carrito.find((prod) => prod.id === borrarId)
//     const indice = carrito.indexOf(item)
//     carrito.splice(indice, 1) 
//     productoCarrito()
//     console.log(carrito)
// }

// //imprimir en el carrito
// const productoCarrito = () => {
//     contenedorCarrito.innerHTML = ""
//     carrito.forEach((prod) => {
//         const div = document.createElement('div')
//         div.className = ('productoEnCarrito')
//         div.innerHTML = `
//         <p>${prod.nombre}</p>
//         <p>Precio:$${prod.precio}</p>
//         <button onclick="eliminarDelCarrito(${prod.id})" class="botonEliminar">ELMINAR PRODUCTO</button>
//         `

//         contenedorCarrito.appendChild(div)
//         //convertimos a JSON string
//         localStorage.setItem('carrito', JSON.stringify(carrito))
//     })
//     //sumar total
//     precioTotal.innerText = carrito.reduce((acum, prod) => acum + prod.precio, 0)
// }