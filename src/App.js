import React, { useEffect, useState } from 'react';
import './index.css';
import Product from './components/product';

function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/1')
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, );

  return (
    <div>
      {products ? <Product product={products} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
