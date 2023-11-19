
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const agregarCarrito = (id, name, pricePro, image) => {
  const productoagregado ={
    "id": id,
    "nombre": name,
    "precio": pricePro,
    "Image": image,
    "cantidad": 0,
  };
  // function logica que guarde los objetos
  // El boton  Carrito debe llamar una funcion que:
  // 1. leer si hay una cookie..analizar si hay objetos repetidos entre la coockie y el array.
  // 2. pintar el offcanvas con los objetos encontrados en el carrito
  const counter = 0;
  const carritoF = carrito.filter((element) => element.id === id);
  if (carritoF.length > 0) {
    console.log(carritoF);
    carritoF[0].cantidad = carritoF[0].cantidad + 1;
    mostrarCarrito();
  } else {
    carrito.push(productoagregado);
  }

  saveLocal();
  mostrarCarrito();
};

const mostrarCarrito = () => {
  const container = document.getElementById("container-carrito");

  container.innerHTML ="";
  // cardlist.innerHTML= "";
  carrito.forEach((element) => {
    const idPro = document.getElementById("idProdu");

    const cardlist = document.createElement("div");
    cardlist.setAttribute("class", "listaCarrito");

    const imagen = document.createElement("img");
    const nombrePro = document.createElement("p");
    const price = document.createElement("p");
    const doc = document.createElement("p");
    const eliminar = document.createElement("span");
    const cantidad = document.createElement("span");
    cantidad.setAttribute("class", "cantidad-carrito");

    // cardlist.appendChild(doc)
    cardlist.appendChild(imagen);
    cardlist.appendChild(nombrePro);
    cardlist.appendChild(price);
    cardlist.appendChild(cantidad);
    cardlist.appendChild(eliminar);

    eliminar.innerText = "x";
    eliminar.className = "eliminar-producto";
    // doc.textContent = id;
    imagen.src = "https://source.unsplash.com/300x400/?nombre";
    nombrePro.textContent = element.nombre;
    price.textContent = element.precio;
    cantidad.textContent = element.cantidad;
    eliminar.addEventListener("click", () => {
      eliminarPro(element.id);
    });

    container.appendChild(cardlist);
  });
};

eliminarPro = (id) => {
  carrito = carrito.filter((element) => element.id !== id);
  saveLocal();
  mostrarCarrito();
};

saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

carritoCounter = () => {
  cantidadCarrito.style.display = "block";
  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

const saveLocalSe = () => {
  localStorage.setItem("log", JSON.stringify(Usr));
};

cerrarSesion = () => {
  // Limpiar la información del usuario en el array y en localStorage
  Usr = [];
  saveLocalSe();
  window.location.href = "/";
};

pago = () => {
  // Recupera productos de localStorage
  const productos = JSON.parse(localStorage.getItem("carrito")) || [];
  console.log(productos);
  // Muestra la lista de productos en el modal
  const listaProductos = document.getElementById("listaProductos");
  productos.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    listaProductos.appendChild(li);
  });

  // Calcula la suma total de los productos
  const totalPagar = productos.reduce((total, producto) => total + producto.precio, 0);

  // Muestra el total en el modal
  document.getElementById("totalPagar").textContent = totalPagar;
};

