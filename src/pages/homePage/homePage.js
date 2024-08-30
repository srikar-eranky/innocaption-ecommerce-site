import React, {useState, useEffect } from "react";
import ProductComponent from "../../components/productComponent/productComponent";
import CartPage from "../cart/cartPage";
import styles from './homePage.module.css';

const HomePage = () => {

  // state variables
  const [productData, setProductData] = useState([]); // available product data
  const [cartProducts, setCartProducts] = useState([]); // cart data 
  const [searchQuery, setSearchQuery] = useState(''); // keyword search query
  const [category, setCategory] = useState(''); // category search query

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

  // remove all quantities of that item from cart
  const removeItem = (id) => {
    const index = cartProducts.findIndex(prod => prod.id === id);
    const updatedProducts = [...cartProducts];
    if(index !== -1){ // if item is in cart
      updatedProducts[index].quantity = 0; // set quantity to 0
      setCartProducts(cartProducts.filter(prod => 
          prod.id !== id
      ))
    }
    console.log(cartProducts);
  }

  // decrease quantity of item in cart
  const decreaseQuantity = (id) => {
    const index = cartProducts.findIndex(prod => prod.id === id); // find item in the cart
    const updatedProducts = [...cartProducts];
    if(index !== -1){ // if item in cart
      const quantity = updatedProducts[index].quantity;
      updatedProducts[index].quantity -= 1
      if(quantity > 1){
        setCartProducts(updatedProducts);
      } else {
        removeItem(id); // if quantity is 1, item is completely removed from cart
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
        const item = data.products[data.products.length - 1];
        console.log("Item: ", item);
        const index = cartProducts.findIndex(product => product.id === item.id);

        if(index === -1){ //if item is not in cart
          setCartProducts(prevCartProducts => [...prevCartProducts, item]);
        }
        console.log(data);
      }).catch(error => {
        console.error("Error patching data", error);
      })
      console.log(cartProducts);
  }

  // increase quantity of item in cart
  const increaseQuantity = (id) => {
    const index = cartProducts.findIndex(product => product.id === id);
    const updatedCartProducts = [...cartProducts];
    if(index !== -1){
      updatedCartProducts[index].quantity += 1;
      setCartProducts(updatedCartProducts);
    } else {
      addItem(id);
    }
  }

    return (
        <div>
          <div className={styles.topRow}>

            <div>
              <CartPage cartProducts={cartProducts} 
              removeItem={removeItem} 
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity} />
            </div>

            <div>
              <h1 style={{textAlign: "center", float: "center"}}>Welcome to ePurchase</h1>
            </div>
            
          </div>
        
        {/* search for items */}
        <div className={styles.forms}>
          <input 
          type='text' 
          placeholder='keyword search...' 
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
          className={styles.form}></input>

          <input
          type="text"
          placeholder="category search..."
          onChange={e => setCategory(e.target.value)}
          value={category}
          className={styles.form}></input>          
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
                    <div style={{backgroundColor: "white", backgroundClip: "border-box", marginBottom: "10px"}}>
                    <ProductComponent 
                      key={product.id}
                      name={product.title}
                      price={product.price}
                      rating={product.rating}
                      thumbnail={product.thumbnail}
                      category={product.category}
                      onClick={() => addItem(product.id)}
                    />
                    </div>
                    <div style={{textAlign: "center", marginBottom: "60px"}}><b>Description:</b> {product.description}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
}

export default HomePage;