
// cards

const arrayTortas = [{
    id: 1,
    img: "img/marquise.jpg",
    nombre: "Marquise",
    precio: 2600,
    stock: 3
},
{
    id: 2,
    img: "img/tfrutilla.jpg", 
    nombre: "Tarta de frutillas",
    precio: 2900,
    stock: 4
},
{
    id: 3,
    img: "img/tcoco.jpg",
    nombre: "Tarta de Coco",
    precio: 2400,
    stock: 2
},
{
    id: 4,
    img: "img/tborracha.jpg",
    nombre: "Torta Borracha",
    precio: 3100,
    stock: 1
},
{
    id: 5,
    img: "img/echocolate.jpg",
    nombre: "Explosion de Chocolate",
    precio: 3300,
    stock: 2
},
{
    id: 6,
    img: "img/thelada.jpg",
    nombre: "Torta Helada",
    precio: 2750,
    stock: 3
},
{
    id: 7,
    img: "img/cabsha.jpg",
    nombre: "Tarta Cabsha",
    precio: 2500,
    stock: 4
},
{
    id: 8,
    img: "img/hpascua.jpg",
    nombre: "Huevos de Pascua",
    precio: 1600,
    stock: 0
}
];
console.log(arrayTortas)

class Torta {
constructor(id, img, nombre, precio, stock) {
    this.id = id;
    this.img = img;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}
}

const productosSection = document.getElementById('mainProductos');

for (let buscado of arrayTortas) {
    productosSection.innerHTML += `
    <div class="productos__1">
        <div class="productos__img">
            <img src="${buscado.img}">
        </div>
        <article class="cardtxt">
            <p>${buscado.nombre}</p>
        </article>
        <div class="cardbtn">
            <button id="boton_precio">COMPRAR ${buscado.precio}</button>
        </div>
        <div id="alert"></div>
    </div>   
    `
}

// Funcion boton

const botonComprar = document.getElementById("boton_precio")
const alertCompra = document.getElementById('alert')

botonComprar.addEventListener('click', () => {
    console.log("funca")
    const comprado = document.createElement('div')
    comprado.innerHTML = `<p>AGREGADO AL CARRITO</p>`
    alertCompra.appendChild(comprado)
    botonComprar.innerText="QUITAR"
})