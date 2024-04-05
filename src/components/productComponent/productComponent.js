import styles from "./productComponent.module.css"

const ProductComponent = ({ onClick, name, price, rating, thumbnail, category }) => {

    return (
        <>
            <div className={styles.component}>
                <div style={{marginRight: "10px"}}>
                    <img src={thumbnail} alt="Thumbnail" style={{maxWidth: "200px", maxHeight: "200px"}}></img>
                </div>

                <div style={{textAlign: "center", marginLeft: "10px"}}>
                    <div>
                        <h3>{name}</h3>
                    </div>
                    <div style={{marginBottom: "10px"}}><b>$<span style={{color: "#008800"}}>{price}</span></b></div>
                    <div style={{marginBottom: "10px"}}><b>Rating:</b> {rating}</div>
                    <div style={{marginBottom: "10px"}}><b>Category:</b> {category}</div>
                    <button className={styles.add} onClick={onClick}>Add item to cart</button>
                </div>
            </div>
        </>
    )
}

export default ProductComponent;