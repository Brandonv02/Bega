
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

agregarCarrito = (id, name, pricePro, image) => {
  const productoagregado ={
    "id": id,
    "nombre": name,
    "precio": parseInt(pricePro),
    "Image": image,
    "cantidad": 1,
  };

  const carritoF = carrito.filter((element) => element.id === id);
  if (carritoF.length > 0) {
    carritoF[0].cantidad = carritoF[0].cantidad + 1;
    carritoF[0].precio = carritoF[0].precio + parseInt(pricePro);
    mostrarCarrito();
  } else {
    carrito.push(productoagregado);
  }
  saveLocal();
  mostrarCarrito(pricePro);
};

const mostrarCarrito = (priceReal) => {
  const container = document.getElementById("container-carrito");

  container.innerHTML ="";
  // cardlist.innerHTML= "";
  carrito.forEach((element) => {
    const cardlist = document.createElement("div");
    cardlist.setAttribute("class", "listaCarrito");

    const imagen = document.createElement("img");
    const nombrePro = document.createElement("p");
    const price = document.createElement("p");
    const eliminar = document.createElement("span");
    const cantidad = document.createElement("span");
    const disminuir = document.createElement("span");
    const aumentar = document.createElement("span");
    cantidad.setAttribute("class", "cantidad-carrito");

    // cardlist.appendChild(doc)
    cardlist.appendChild(imagen);
    cardlist.appendChild(nombrePro);
    cardlist.appendChild(price);
    cardlist.appendChild(disminuir);
    cardlist.appendChild(cantidad);
    cardlist.appendChild(aumentar);
    cardlist.appendChild(eliminar);

    eliminar.innerText = "x";
    eliminar.className = "eliminar-producto";
    // doc.textContent = id;
    imagen.src = "https://source.unsplash.com/300x400/?nombre";
    nombrePro.textContent = element.nombre;
    price.textContent = `$${element.precio}`;
    disminuir.innerText = "-";
    disminuir.className = "disminuir-producto";
    cantidad.textContent = element.cantidad;
    aumentar.innerText = "+";
    aumentar.className = "aumentar-producto";
    eliminar.addEventListener("click", () => {
      eliminarPro(element.id);
    });
    aumentar.addEventListener("click", ()=> {
      const carritoF = carrito.filter((param) => param.id === element.id);
      if (carritoF.length > 0) {
        element.cantidad = carritoF[0].cantidad + 1;
        mostrarCarrito();
      }
    });
    disminuir.addEventListener("click", ()=> {
      const carritoF = carrito.filter((param) => param.id === element.id);
      if (carritoF.length > 0 && carritoF[0].cantidad > 0) {
        element.cantidad = carritoF[0].cantidad - 1;
        mostrarCarrito();
      }
    });
    container.appendChild(cardlist);
  });
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const footerModal = document.getElementById("totalPrice");
  footerModal.innerHTML = `Total: $${total}`;

  const mercadopago = new MercadoPago("TEST-8690f390-35e6-4d3d-aa40-cc2e81aedb87", {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  });

  const checkOut = document.getElementById("checkout-btn");
  checkOut.addEventListener("click", function() {
    checkOut.remove();

    const orderData = {
      quantity: 1,
      description: "Compra de prueba",
      price: total,
    };

    fetch("http://localhost:3002/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
        .then(function(response) {
          return response.json();
        })
        .then(function(preference) {
          createCheckoutButton(preference.id);

          $(".shopping-cart").fadeOut(500);
          setTimeout(() => {
            $(".container_payment").show(500).fadeIn();
          }, 500);
        })
        .catch(function(err) {
          console.error(err);
          $("#checkout-btn").attr("disabled", false);
        });
  });

  function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    const bricksBuilder = mercadopago.bricks();

    const renderComponent = async (bricksBuilder) => {
      if (window.checkoutButton) window.checkoutButton.unmount();
      await bricksBuilder.create(
          "wallet",
          "button-checkout", // class/id where the payment button will be displayed
          {
            initialization: {
              preferenceId: preferenceId,
            },
            callbacks: {
              onError: (error) => console.error(error),
              onReady: () => {},
            },
          },
      );
    };
    window.checkoutButton = renderComponent(bricksBuilder);
  }
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
  Usr = [];
  localStorage.removeItem("log");
  localStorage.removeItem("data");
  saveLocalSe();
  window.location.href = "/";
};

consultarCookie = () => {
  const loguea = JSON.parse(localStorage.getItem("log"));
  if (loguea[0] === undefined) {
    window.location.href = "redirect";
  }
  if (carrito.length === 0) {
    Swal.fire({
      title: "Opss!",
      text: "Selecciona productos del catalogo",
      icon: "error",
    });
    setTimeout(() => {
      window.location.href = "landing";
    }, 1000);
  }
};

