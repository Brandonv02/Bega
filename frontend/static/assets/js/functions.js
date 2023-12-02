            let carritocomp = JSON.parse(localStorage.getItem("carritocompras")) || [];
            let body = document.getElementById("bodycarrito")

            function carrito(id, descripcion, valor, stock) {
                const repeat = carritocomp.some((repeatid) => repeatid.id == id);

                if (repeat) {
                    carritocomp.map((produ) => {
                        if (produ.id == id) {
                            produ.cantidad++;
                        }
                    })
                }
                carritocomp.push({
                    id: id,
                    descripcion: descripcion,
                    valor: valor,
                    stock: stock,
                    cantidad: 1
                });
                console.log(carritocomp);
                cookies();
                pintarCarrito();
            }

            function cookies() {
                localStorage = JSON.parse(localStorage.getItem("carritocompras"))

            };

            function pintarCarrito() {
                body.innerHTML = "";

                carritocomp.forEach(product => {
                    let carrito = document.createElement('div')
                    carrito.classList.add('d-flex');
                    carrito.innerHTML =
                        `<table id="agruparcarrito">
                        <tr>
                            <td>
                                <img src="https://source.unsplash.com/featured/300x201" style="height: 80px;">
                            </td>
                            
                            <td>
                                ${product.descripcion}
                            
                            </td>
                        </tr>
                        <tr>
                            <td>
                                
                                <button type="button" class="btn btn-light" onclick="sumar('${product.id}')"><i class="bi bi-plus-circle"></i></button>
                                <b>Cantidad: </b>${product.cantidad}
                                <button type="button" class="btn btn-light" onclick="restar('${product.id}')"><i class="bi bi-dash-circle"></i></button>
                            </td>
                            
                            <td>
                                <b>Valor $ </b>${product.valor}
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td COLSPAN=2>
                                <b>Total: $ ${product.cantidad * product.valor}</b>
                            </td>
                        </tr>
                        </table>`;
                    body.append(carrito);

                    let eliminarprod = document.createElement('span');
                    eliminarprod.innerText = "🗑";
                    eliminarprod.className = "delete-producto";
                    carrito.append(eliminarprod);

                    eliminarprod.addEventListener("click", eliminar);

                });

            
                // let footerTotal = document.getElementById('totalProduct');
                const total = carritocomp.reduce((acc, pro) => acc + parseFloat(pro.valor) * (pro.cantidad), 0);
                const totalproducts = document.createElement("div");
                const footerttl = document.createElement("div");
                footerttl.innerHTML = `<b>Pago total: $ ${total}</b>`;
                totalproducts.className = "total-content";
                totalproducts.innerHTML = `<b>Pago total: $ ${total}</b>`;
                body.append(totalproducts);
                footerTotal.append(footerttl);
            };
            

            const eliminar = () => {
                const foundId = carritocomp.find((product) => product.id);
                console.log(foundId);

                carritocomp = carritocomp.filter((carritoId) => {
                    return carritoId !== foundId;

                });
                cookies();
                pintarCarrito();
            };

            function sumar(id) {
                carritocomp.map((produ) => {
                    if (produ.id == id) {
                        produ.cantidad++;
                        cookies();
                        pintarCarrito();
                    }
                });
            }

            function restar(id) {
                carritocomp.map((produ) => {
                    if (produ.id == id) {
                        produ.cantidad--;
                        cookies();
                        pintarCarrito()
                        if (produ.id == 0) {
                            pintarCarrito();
                            cookies();
                            eliminar();
                        }
                    }
                });
            }
