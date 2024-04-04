import React, {useState, useEffect } from "react";
import ProductComponent from "../../components/productComponent/productComponent";
import CartPage from "../cart/cartPage";
import styles from './homePage.module.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

const HomePage = () => {

    const [productData, setProductData] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [query, setQuery] = useState('');

    // load all available products
    useEffect(() => {
        fetch("https://dummyjson.com/products").
        then(res => res.json()).
        then((data) => {
            setProductData(data)
        }).catch(error => {
            console.error("Error:", error);
            }
        )
    }, [])

    const removeItem = (id) => {
      const index = cartProducts.findIndex(prod => prod.id === id);
      const updatedProducts = [...cartProducts];
      if(index !== -1){
        const quantity = updatedProducts[index].quantity;
        updatedProducts[index].quantity -= 1
        if(quantity > 1){
          setCartProducts(updatedProducts);
        } else {
          setCartProducts(cartProducts.filter(prod => 
            prod.id !== id
          ))
        }
      }
      console.log(cartProducts);
  }

    // load items from search
    useEffect(() => {
        const url = "https://dummyjson.com/products/search?q=" + query
        fetch(url).
        then(res => res.json()).then((data) => {
        setProductData(data);
        }).catch(error => {
        console.error("Error fetching data:", error);
        })
    }, [query])

    // add item to cart
  const addItem = (id) => {
    const url = 'https://dummyjson.com/carts/1';
    fetch(url, {
        method: 'PATCH', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merge: true, // this will include existing products in the cart
          products: [
            {
              id: id,
              quantity: 1,
            }
          ]
        })
      })
      .then(res => res.json()).
      then((data) => {
        const item = data.products[5];
        const index = cartProducts.findIndex(product => product.id === item.id);

        if(index !== -1){
          const updatedCartProducts = [...cartProducts];
          updatedCartProducts[index].quantity += item.quantity;
          setCartProducts(updatedCartProducts);
        } else {
          setCartProducts(prevCartProducts => [...prevCartProducts, item]);
        }
      }).catch(error => {
        console.error("Error patching data", error);
      })
      console.log(cartProducts);
  }

    return (

        <div>
        {/* search for items */}
            <input 
            type='text' 
            placeholder='Search for an item and press enter' 
            onChange={e => setQuery(e.target.value)}
            value={query}></input>
            <div className={styles.main}>
    
          
    
          {/* list of available products */}
          <div className={styles.productsDiv}>
            <h1>Product List</h1>
            {(typeof productData.products === 'undefined') ? (
              <p>Loading...</p>
            ) : (
              productData.products.map(product => (
                <div>
                  <ProductComponent 
                    key={product.id}
                    name={product.title}
                    price={product.price}
                    rating={product.rating}
                    onClick={() => addItem(product.id)}
                  />
                </div>
              ))
            )}
          </div>

          <div className={styles.cartDiv}>
            <CartPage cartProducts={cartProducts} updateCart={removeItem}/>
          </div>

        </div>
        </div>
      );
}

export default HomePage;