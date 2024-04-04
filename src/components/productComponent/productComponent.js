import styles from "./productComponent.module.css"

const ProductComponent = ({ onClick, name, price, rating }) => {

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