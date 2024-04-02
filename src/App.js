import styles from './App.css';
import React, { useState, useEffect } from 'react';
import ProductComponent from './components/productComponent/productComponent';
import CartComponent from './components/cartComponent/cartComponent';

function App() {
  const [productData, setProductData] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [query, setQuery] = useState('');

  // load all available products
  useEffect(() => {
    fetch("https://dummyjson.com/products").
    then(res => res.json()).
    then((data) => {
        setProductData(data)
      }
    ).catch(
      error => {
        console.error("Error:", error);
      }
    )
  }, [])

  // load items from search
  useEffect(() => {
    let url = "https://dummyjson.com/products/search?q=" + query
    fetch(url).
    then(res => res.json()).then((data) => {
      setProductData(data);
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  })

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
        setCartProducts(prevCartProducts => [...prevCartProducts, item]);
      }).catch(error => {
        console.error("Error patching data");
      })
  }

  // delete items from cart
  const removeItem = (id) => {
    setCartProducts(cartProducts.filter(prod => 
      prod.id !== id
    ))
  }

  return (
    <div className={styles.main}>

      {/* search for items */}
      <input type='text' placeholder='Search for an item' onChange={(e) => setQuery(e.target.value)}></input>

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

      {/* list of products in the cart */}
      <div className={styles.cartDiv}>
        <h1>Cart</h1>
        {(typeof cartProducts === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          cartProducts.map(cartProduct => (
            <div>
              <CartComponent
              key={cartProduct.id}
              name={cartProduct.title}
              price={cartProduct.price}
              quantity={cartProduct.quantity}
              onClick={() => removeItem(cartProduct.id)}
              />
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}

export default App;
