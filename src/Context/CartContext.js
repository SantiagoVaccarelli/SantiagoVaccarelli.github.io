import { createContext, useState } from 'react';
export const context = createContext();
export const { Provider } = context;


const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product, qty) => {
        cart.some(item => item.product.id === product.id)? setCart((prevCart)=> prevCart.map((item) => item.product.id===product.id?{ 'product': item.product, 'qty': qty+item.qty }:item)):setCart((prevCart)=> [...prevCart, { 'product': product, 'qty': qty }]);
    }
  
    const removeFromCart = (product) => {
        setCart(cart.filter(item => item.product.id !== product.product.id));
    };
    
    const clearCart = () => setCart([]);

    const subTotal = (item) => item.product.price * item.qty;

    const total = () => {
        let total = 0;
        cart.forEach(item => total+=item.qty*item.product.price);
        return total;
    }

    const cartValues = {
        cart:cart,
        addToCart: addToCart,
        removeFromCart:removeFromCart,
        clearCart:clearCart,
        subTotal:subTotal,
        total:total
    }

    return (
        <Provider value={ cartValues }>{ children } </Provider>
    )
}

export default CartProvider;