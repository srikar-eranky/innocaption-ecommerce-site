import React from "react";

const ProductComponent = ({ name, price, rating }) => {
    return (
        <div>
            <div>Name: {name}</div>
            <div>price = ${price}</div>
            <div>Rating: {rating}</div>
        </div>
    )
}

export default ProductComponent;