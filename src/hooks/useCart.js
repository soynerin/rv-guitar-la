import { useEffect, useMemo, useState } from "react"
import { db } from '../data/db.js'

const useCart = () => {
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

    const isCartEmpty = useMemo( () => cart.length === 0, [cart] )

    const totalMountCart = useMemo( () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cart] )

    return {
        data,
        cart,
        handleCartChange,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isCartEmpty,
        totalMountCart
    }
}

export default useCart;