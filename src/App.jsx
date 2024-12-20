// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import ProductList from './Components/ProductList';
import LoginForm from './Components/LoginForm';
import Register from './Components/RegisterForm'; // Import Register component
import Home from './Components/Home';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/products" element={<ProductList />} /> {/* Product list route */}
      </Routes>
    </Router>
  );
};

export default App;
