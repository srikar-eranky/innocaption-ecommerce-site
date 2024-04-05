import React from "react";
import styles from "./cartComponent.module.css";

const CartComponent = ({ onClick, decrease, increase, name, price, quantity }) => {

    return (
        <div className={styles.component}>
            <div className={styles.detail}><h3>{name}</h3></div>
            <div className={styles.detail}>Price: ${price}</div>
            <div className={styles.detail}>
                <button onClick={decrease} className={styles.updateQuantity} id={styles.decrease}>-</button>
                Quantity: {quantity}
                <button onClick={increase} className={styles.updateQuantity} id={styles.increase}>+</button>
            </div>
            <button className={styles.delete} onClick={onClick}>Delete item from cart</button>
        </div>
    )
}

export default CartComponent;