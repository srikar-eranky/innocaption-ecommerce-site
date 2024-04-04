import React, { useState, useEffect } from "react";
import CartComponent from "../components/cartComponent/cartComponent"

const CartPage = ({ cartProducts }) => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart([...cartProducts]);
    }, [cartProducts]);

    const removeItem = (id) => {
        setCart(cart.filter(prod => 
          prod.id !== id
        ))
    }

    return (
        <div>
            <h1>Cart</h1>
            {(typeof cart === 'undefined') ? (
            <p>Loading...</p>
            ) : (
            cart.map(cartProduct => (
                <div>
                <CartComponent
                key={cartProduct.id}
                name={cartProduct.title}
                price={cartProduct.price}
                quantity={cartProduct.quantity}
                onClick={() => removeItem(cartProduct.id)}
                />
                </div>
            ))
            )}
        </div>
    )
}

export default CartPage;