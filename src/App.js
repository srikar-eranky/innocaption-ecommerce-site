import './App.css';
import React, { useState, useEffect } from 'react';
import ProductComponent from './components/productComponent';

function App() {
  const [productData, setProductData] = useState([])

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

  const hello = 5;
  
  return (
    <div>
      <input type='text' placeholder='Search for an item'></input>
      {(typeof productData.products === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        productData.products.map(product => (
          <ProductComponent 
            key={product.id}
            name={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))
      )}
    </div>
  );
}

export default App;
