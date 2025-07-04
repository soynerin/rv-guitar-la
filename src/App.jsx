import { useEffect, useState } from "react"
import { db } from './data/db.js'
import Guitar from "./components/Guitar"
import Header from "./components/Header"

function App() {

    const initialCart = JSON.parse(localStorage.getItem('cart')) || []

    const [data, setData] = useState([])
    const [cart, setCart] = useState(initialCart)

    useEffect(() => {
        setData(db)
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function handleCartChange(newCart) {        
        const cartExistsIndex = cart.findIndex(item => newCart.id === item.id)
        if(cartExistsIndex >= 0){
            const updatedCart = [...cart]
            updatedCart[cartExistsIndex].quantity++
            
            setCart(updatedCart)
        } else {
            newCart.quantity = 1
            setCart((prevCart) => [...prevCart, newCart])
        }
    }

    function removeFromCart(id){
        setCart((prevCart) => prevCart.filter(item => item.id !== id))
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map((item) => {
            if(item.id === id){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })

        setCart(updatedCart)
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map((item) => {
            if(item.id === id){
                return{
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        }).filter(item => item.quantity > 0)

        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    return (
        <>

        <Header 
            cart={cart}
            removeFromCart={removeFromCart} 
            increaseQuantity={increaseQuantity} 
            decreaseQuantity={decreaseQuantity} 
            clearCart={clearCart} />

        <main class="container-xl mt-5">
            <h2 class="text-center">Nuestra Colección</h2>

            <div class="row mt-5">
                {data.map((guitar) => {
                    return (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            handleCartChange={handleCartChange}
                        />)
                })}
            </div>
        </main>


        <footer class="bg-dark mt-5 py-5">
            <div class="container-xl">
                <p class="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
        </>
    )
}

export default App
