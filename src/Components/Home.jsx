import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import anime from 'animejs';
import { Fade } from 'react-awesome-reveal';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './Home.scss';

const Home = () => {
  const categoryRef = useRef(null);
  const productRef = useRef(null);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [data, setData] = useState({
    title: "Welcome to Our Online Store",
    description: "Explore our wide range of products and enjoy amazing discounts!",
    categories: [
      { id: 1, name: "Electronics", image: "https://images.unsplash.com/photo-1611532736573-418fe4ae3260?w=500" },
      { id: 2, name: "Clothing", image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=500" },
      { id: 3, name: "Home Appliances", image: "https://plus.unsplash.com/premium_photo-1664372899494-774422f7ce61?w=500" },
      { id: 4, name: "Books", image: "https://plus.unsplash.com/premium_photo-1681825268400-c561bd47d586?w=500" },
      { id: 5, name: "Toys", image: "https://plus.unsplash.com/premium_photo-1684795780266-ecd819f04f96?w=500" },
      { id: 6, name: "Sports & Fitness", image: "https://images.unsplash.com/photo-1732737915298-ba37d6b1aa55?w=500" },
    ],
    products: [
      { id: 1, name: "Smartphone", image: "https://images.unsplash.com/photo-1599950753725-ea5d8aba0d29?w=500", price: "$499", description: "A high-performance smartphone with all the latest features.", rating: 4.5, inStock: true, discount: "10% OFF" },
      { id: 2, name: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500", price: "$799", description: "Powerful laptop for work, gaming, and more.", rating: 4.7, inStock: true, discount: "15% OFF" },
      { id: 3, name: "Washing Machine", image: "https://images.unsplash.com/photo-1668417863230-64f268d1d252?w=500", price: "$299", description: "Energy-efficient washing machine with modern features.", rating: 4.2, inStock: false, discount: "5% OFF" },
      { id: 4, name: "Bluetooth Speaker", image: "https://plus.unsplash.com/premium_photo-1682125804795-b09be6ee57a5?w=500", price: "$99", description: "Portable Bluetooth speaker with great sound quality.", rating: 4.3, inStock: true, discount: "20% OFF" },
      { id: 5, name: "Electric Kettle", image: "https://images.unsplash.com/photo-1647619124290-10fb9273b4b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RWxlY3RyaWMlMjBLZXR0bGV8ZW58MHx8MHx8fDA%3D", price: "$49", description: "Fast-boiling electric kettle with auto shut-off feature.", rating: 4.6, inStock: true, discount: "30% OFF" },
      { id: 6, name: "Smart Watch", image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFydCUyMFdhdGNofGVufDB8fDB8fHww", price: "$149", description: "Smartwatch with fitness tracking and heart rate monitor.", rating: 4.8, inStock: true, discount: "10% OFF" },
      { id: 7, name: "Running Shoes", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UnVubmluZyUyMFNob2VzfGVufDB8fDB8fHww", price: "$79", description: "Comfortable running shoes for all-day wear.", rating: 4.4, inStock: true, discount: "25% OFF" },
      { id: 8, name: "Men's Jacket", image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: "$99", description: "Stylish men's jacket for winter.", rating: 4.1, inStock: true, discount: "10% OFF" },
      { id: 9, name: "Women’s Handbag", image: "https://images.unsplash.com/photo-1602532360508-595f449c7c55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFdvbWVuJUUyJTgwJTk5cyUyMEhhbmRiYWd8ZW58MHx8MHx8fDA%3D", price: "$69", description: "Elegant women’s handbag with a modern design.", rating: 4.9, inStock: true, discount: "5% OFF" },
    ],
  });

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = data.categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = data.products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const springStyles = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    const handleScroll = () => {
      if (categoryRef.current && productRef.current) {
        const categoryRect = categoryRef.current.getBoundingClientRect();
        const productRect = productRef.current.getBoundingClientRect();

        setCategoryVisible(categoryRect.top < window.innerHeight * 0.8);
        setProductVisible(productRect.top < window.innerHeight * 0.8);
      }
    };

    gsap.fromTo(
      ".animated-element",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: "bounce.out" }
    );

    anime({
      targets: ".category-card",
      rotate: '1turn',
      scale: 1.1,
      duration: 1500,
      easing: "easeInOutQuad",
      delay: anime.stagger(200),
    });
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check when the component is mounted

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <motion.div
          className="animated-element"
          style={springStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1>{data.title}</h1>
          <p>{data.description}</p>

          <input
            type="text"
            placeholder="Search Categories or Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />

          <h2>Shop by Category</h2>
          <div className="categories" ref={categoryRef}>
            {filteredCategories.map((category) => (
              <Fade key={category.id}>
                <div className="category-card">
                  <img src={category.image} alt={category.name} />
                  <h3>{category.name}</h3>
                </div>
              </Fade>
            ))}
          </div>

          <h2>Featured Products</h2>
          <div className="products" ref={productRef}>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="product-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="price">{product.price}</span>
                <span className="discount">{product.discount}</span>
                <div className="rating">
                  {"★".repeat(Math.floor(product.rating))} {product.rating} (
                  {Math.floor(Math.random() * 200) + 1} reviews)
                </div>
                {product.inStock ? (
                  <span className="in-stock">In Stock</span>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Canvas camera={{ position: [2, 2, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
          <mesh position={[2, 0, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="blue" />
          </mesh>
          <OrbitControls />
        </Canvas>
      </header>
    </div>
  );
};

export default Home;
