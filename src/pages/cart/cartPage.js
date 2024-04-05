import React, { useState, useEffect } from "react";
import CartComponent from "../../components/cartComponent/cartComponent"
import styles from "./cartPage.module.css"

const CartPage = ({ cartProducts, updateCart, updateOpen }) => {

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
            <div className={styles.cart} style={{
                transform: isOpen
                ? "translate(0%,0%) scale(1)"
                : "translate(-10%,-10%) scale(0)",
                }}>
                {/* cancel button*/}
                <div className={styles.cancelDiv}>
                    <span onClick={() => {
                        setOpen(false);
                        console.log(isOpen)}}>
                        <span className={styles.cancel}>X</span>
                    </span>
                </div>
                
                <div className={styles.component}>
                    {(typeof cart === 'undefined') ? (
                        <p>Loading...</p>
                    ) : (
                        cart.map(cartProduct => (
                            
                            <CartComponent
                            key={cartProduct.id}
                            name={cartProduct.title}
                            price={cartProduct.price}
                            quantity={cartProduct.quantity}
                            onClick={() => handleRemove(cartProduct.id)}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className={styles.button}>
                <button onClick={() => {
                        setOpen(true);
                        console.log(isOpen);
                    }}>View cart</button>
            </div>
            
        </>
    )
}

export default CartPage;