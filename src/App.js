import styles from './App.css';
import React, { useState, useEffect } from 'react';
import HomePage from './pages/homePage/homePage';

function App() {

  return (
  <div>
    <div className={styles.header}>
      <h1>Welcome to the ecommerce site</h1>
      <HomePage />
    </div>
    
  </div>
  );
}

export default App;
