import React, { useState, useEffect } from "react";
import styles from "./cartComponent.module.css";

const CartComponent = ({ onClick, name, price, quantity }) => {

    return (
        <div className={styles.component}>
            <div>Name: {name}</div>
            <div>Price: ${price}</div>
            <div>Quantity: {quantity}</div>
            <button onClick={onClick}>Delete item from cart</button>
        </div>
    )
}

export default CartComponent;