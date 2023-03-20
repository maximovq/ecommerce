let productos = [
    {
        id: 1,
        nombre: 'Naranja',
        descripcion: '1 docena de naranjas',
        precio: 300,
        imagen: './img/naranja.jpeg',
        catalogo: 'fruta'
    },
    {
        id: 2,
        nombre: 'Manzana',
        descripcion: '1k de manzana',
        precio: 300,
        imagen: './img/manzana.jpg',
        catalogo: 'fruta'
    },
    {
        id: 3,
        nombre: 'Mandarina',
        descripcion: '1 docena de mandarina',
        precio: 300,
        imagen: './img/mandarina.png',
        catalogo: 'fruta'
    },
    {
        id: 4,
        nombre: 'Cebolla',
        descripcion: '1k de cebolla',
        precio: 300,
        imagen: './img/cebolla.jpg',
        catalogo: 'verdura'
    },
    {
        id: 5,
        nombre: 'Papa',
        descripcion: '1k de papa',
        precio: 300,
        imagen: './img/papa.jpg',
        catalogo: 'verdura'
    },
    {
        id: 6,
        nombre: 'Acelga',
        descripcion: '1 mazo de acelga',
        precio: 300,
        imagen: './img/acelga.jpg',
        catalogo: 'verdura'
    }
]

let carrito = [];
const peso = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#productosEnCarrito');
const numCarrito = document.getElementById('numCarrito');
const total = document.getElementById('total');
const categoriaFruta = document.getElementById('categoriaFruta');


function renderizarProductos(){
    productos.forEach((info) => {
        const col = document.createElement('div');
        col.classList.add('col-sm-4', 'mt-3');
        const card = document.createElement('div');
        card.classList.add('card', 'card-personalizada');
        card.dataset.categoria = info.catalogo;
        const img = document.createElement('img');
        img.setAttribute('src', info.imagen);
        img.classList.add('card-img-top', 'img-fluid');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const titulo = document.createElement('h5');
        titulo.classList.add('card-title');
        titulo.textContent = info.nombre;
        const descripcion = document.createElement('p')
        descripcion.classList.add('card-text');
        descripcion.textContent = info.descripcion;
        const btnAgregar = document.createElement('a');
        btnAgregar.classList.add('btn', 'btn-primary');
        btnAgregar.textContent = 'Agregar';
        btnAgregar.setAttribute('marcador', info.id);
        btnAgregar.addEventListener('click', añadir);

        const limpiarCarrito = document.querySelector('#vaciar');
        limpiarCarrito.addEventListener('click', vaciarCarrito);

        DOMitems.appendChild(col);
        col.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(titulo);
        cardBody.appendChild(descripcion);
        cardBody.appendChild(btnAgregar);
    })
}

categoriaFruta.addEventListener('click', filtrarCategoriaF);

function filtrarCategoriaF(){
    
}

function añadir(e){
    carrito.push(e.target.getAttribute('marcador'));
    renderizarCarrito();
}

function renderizarCarrito(){
    DOMcarrito.textContent = '';
    numCarrito.textContent = carrito.length;
    const carritoSinDuplicado = [...new Set(carrito)];
    carritoSinDuplicado.forEach((item) => {
        const miItem = productos.filter((itemProductos) => {
            return itemProductos.id === parseInt(item);
        });
        const numeroUnidades = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1: total;
        }, 0);



        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidades} x ${miItem[0].nombre} - ${miItem[0].precio}${peso}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);




    });
    total.textContent = `${peso} ${calcularTotal()}`;

}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
}

function calcularTotal(){
    return carrito.reduce((total, item) => {
        const miItem = productos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}


function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

renderizarProductos();
renderizarCarrito();
