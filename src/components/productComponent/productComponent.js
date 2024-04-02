import React, { useEffect } from "react";
import styles from "./productComponent.module.css"
import { useState } from "react";

const ProductComponent = ({ onClick, name, price, rating }) => {
    // const [cart, setCart] = useState({});
    // const [cartProducts, setCartProducts] = useState([]);

    // useEffect(() => {
    //     console.log("Cart products: ", cartProducts)
    // }, [cartProducts]);

    // const addItem = () => {
    //     const url = 'https://dummyjson.com/carts/1';
    //     fetch(url, {
    //         method: 'PATCH', /* or PATCH */
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //           merge: true, // this will include existing products in the cart
    //           products: [
    //             {
    //               id: id,
    //               quantity: 1,
    //             }
    //           ]
    //         })
    //       })
    //       .then(res => res.json()).
    //       then((data) => {
    //         const item = data.products[5];
    //         setCartProducts(prevCartProducts => [...prevCartProducts, item]);
    //       }).catch(error => {
    //         console.error("Error patching data");
    //       })
    // }

    return (
        <div className={styles.component}>
            <div>Name: {name}</div>
            <div>price = ${price}</div>
            <div>Rating: {rating}</div>
            <button onClick={onClick}>Add item to cart</button>
        </div>
    )
}

export default ProductComponent;