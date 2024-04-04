import React, { useState, useEffect } from "react";
import CartComponent from "../../components/cartComponent/cartComponent"
import styles from "./cartPage.module.css"

const CartPage = ({ cartProducts, updateCart }) => {

    const [cart, setCart] = useState([]);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setCart([...cartProducts]);
    }, [cartProducts]);

    const handleRemove = (id) => {
        updateCart(id);
    }

    return (
        <>
        {/* cart image */}
        <div>
        <button onClick={() => {
            setOpen(true);
            console.log(isOpen);
        }}>View cart</button>
        </div>
        <div className={styles.cart} style={{transform: isOpen ? 
        "translate(0%,0%) scale(1)" : "translate(-10%,-10%) scale(0)"}}>
            <h1>Cart</h1>
            {/* cancel button*/}
            <div>
                <span onClick={() => {
                    setOpen(false);
                    console.log(isOpen);
                }}
                >
                    <span>X</span>
                </span>
            </div>

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
                    onClick={() => handleRemove(cartProduct.id)}
                    />
                </div>
            ))
            )}
        </div>
        </>
    )
}

export default CartPage;