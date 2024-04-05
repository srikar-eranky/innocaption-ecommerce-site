import React, {useState, useEffect, useRef } from "react";
import ProductComponent from "../../components/productComponent/productComponent";
import CartPage from "../cart/cartPage";
import styles from './homePage.module.css';

const HomePage = () => {

    const [productData, setProductData] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');

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

    // remove items from cart
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

    // load items from search by keyword
    useEffect(() => {
        const url = "https://dummyjson.com/products/search?q=" + searchQuery
        fetch(url).
        then(res => res.json()).then((data) => {
          setProductData(data);
        }).catch(error => {
        console.error("Error fetching data:", error);
        })
    }, [searchQuery])

    // load items from search by category
    useEffect(() => {
      let url = "https://dummyjson.com/products/category/"
      if(category === ''){
        url = "https://dummyjson.com/products"
      } else {
        url = "https://dummyjson.com/products/category/" + category
      }
      fetch(url).
      then(res => res.json()).
      then((data) => {
        setProductData(data);
      }).catch(error => {
        console.error("Error fetching data:", error);
      })
    }, [category])

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
          <div className={styles.topRow}>

            <div>
              <CartPage cartProducts={cartProducts} updateCart={removeItem} />
            </div>

            <div>
              <h1 style={{textAlign: "center", marginLeft: "680px"}}>Welcome to ePurchase</h1>
            </div>
            
          </div>
        
        {/* search for items */}
        <div className={styles.forms}>
          <input 
          type='text' 
          placeholder='keyword search' 
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
          style={{marginRight: "10px"}}></input>

          <input
          type="text"
          placeholder="category search"
          onChange={e => setCategory(e.target.value)}
          value={category}
          style={{marginLeft: "10px"}}></input>          
        </div>

          <div className={styles.main}>
    
            {/* list of available products */}
            <div className={styles.productsDiv}>
              <p>View and search for all available products below:</p>
              {(typeof productData.products === 'undefined') ? (
                <p>Loading...</p>
              ) : (
                productData.products.map(product => (
                  <div>
                    <ProductComponent 
                      key={product.id}
                      name={product.title}
                      description={product.description}
                      price={product.price}
                      rating={product.rating}
                      thumbnail={product.thumbnail}
                      onClick={() => addItem(product.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
}

export default HomePage;