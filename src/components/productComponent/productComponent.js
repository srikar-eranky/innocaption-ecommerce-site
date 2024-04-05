import styles from "./productComponent.module.css"

const ProductComponent = ({ onClick, name, description, price, rating, thumbnail }) => {

    return (
        <div className={styles.component}>
            <div>Name: {name}</div>
            <div>Description: {description}</div>
            <div>price = ${price}</div>
            <div>Rating: {rating}</div>
            <div><img src={thumbnail} alt="Thumbnail"></img></div>
            <button onClick={onClick}>Add item to cart</button>
        </div>
    )
}

export default ProductComponent;