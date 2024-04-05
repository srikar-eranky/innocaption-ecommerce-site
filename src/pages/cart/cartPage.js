import React, { useState, useEffect } from "react";
import CartComponent from "../../components/cartComponent/cartComponent"
import styles from "./cartPage.module.css"

const CartPage = ({ cartProducts, removeItem, increaseQuantity, decreaseQuantity }) => {

    const [cart, setCart] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setCart([...cartProducts]);
    }, [cartProducts]);

    const handleRemove = (id) => {
        removeItem(id);
    }

    const handleIncrease = (id) => {
        increaseQuantity(id);
    }

    const handleDecrease = (id) => {
        decreaseQuantity(id);
    }

    useEffect(() => {
        let finPrice = 0;
        cartProducts.forEach(prod => {
          finPrice += (prod.quantity * prod.price);
        })
        setTotal(finPrice);
        console.log(total);
    }, [cart])
    
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
                    <h2 style={{color: "white"}}>Your Cart</h2>
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
                            increase={() => handleIncrease(cartProduct.id)}
                            decrease={() => handleDecrease(cartProduct.id)}
                            />
                        ))
                    )}
                    <div>
                        <h3 style={{color: "white"}}>Total: ${total}</h3>
                    </div>
                    <button className={styles.checkout}>Checkout</button>
                </div>
            </div>

            <div className={styles.button}>
                <button onClick={() => {
                        setOpen(true);
                        console.log(isOpen);
                    }}
                    className={styles.buttonStyles}>View cart</button>
            </div>
            
        </>
    )
}

export default CartPage;