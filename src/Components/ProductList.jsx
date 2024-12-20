// // src/components/ProductList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Ensure the correct URL is used for the API endpoint
//         const response = await axios.get('http://localhost:5000/api/products');  // Correct URL for backend
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch products');
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="product-list">
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             <div className="product-card">
//               <img src={product.image || '/default-image.jpg'} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <p>Price: ${product.price}</p>
//               <p>In Stock: {product.countInStock}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;

// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Correct API URL
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="product-page">
        <h1>Loading products...</h1> {/* Optional loading message */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-page">
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image ? product.image : '/default-image.jpg'}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>In Stock: {product.countInStock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
