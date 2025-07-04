import { useMemo } from "react";

const Header = ({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart}) => {

    // State derivado
    const isCartEmpty = useMemo( () => cart.length === 0, [cart] )

    const totalMountCart = useMemo( () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cart] )

    return (
        <header class="py-5 header">
          <div class="container-xl">
              <div class="row justify-content-center justify-content-md-between">
                  <div class="col-8 col-md-3">
                      <a href="index.html">
                          <img class="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
                      </a>
                  </div>
                  <nav class="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                      <div 
                          class="carrito"
                      >
                          <img class="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

                          <div id="carrito" class="bg-white p-3">
                              

                              { 
                                isCartEmpty ? 
                                    (
                                        <p class="text-center">No hay elementos en el carrito</p>
                                    ) :
                                    (
                                        <table class="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(item => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <img class="img-fluid" src={`/img/${item.image}.jpg`} alt="imagen guitarra" />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td class="fw-bold">
                                                                ${item.price}
                                                        </td>
                                                        <td class="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                class="btn btn-dark"
                                                                onClick={() => decreaseQuantity(item.id)}
                                                            >
                                                                -
                                                            </button>
                                                                {item.quantity}
                                                            <button
                                                                type="button"
                                                                class="btn btn-dark"
                                                                onClick={() => increaseQuantity(item.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                class="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(item.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                
                                            </tbody>
                                        </table>
                                    )
                                }

                                <p class="text-end">Total pagar: <span class="fw-bold">${totalMountCart}</span></p>
                                <button class="btn btn-dark w-100 mt-3 p-2" onClick={clearCart}>Vaciar Carrito</button>
                          </div>
                      </div>
                  </nav>
              </div>
          </div>
      </header>
    )
}

export default Header;