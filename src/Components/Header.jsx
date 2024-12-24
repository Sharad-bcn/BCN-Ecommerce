
 import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Using Link from react-router-dom for navigation
import './Header.scss'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">BCN E-Commerce</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link> {/* Use Link for navigation */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link> {/* Use Link for navigation */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link> {/* Use Link for navigation */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link> {/* Use Link for navigation */}
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li> */}
          </ul>
          <form className="d-flex ms-auto" role="search">
            <input className="form-control me-2" type="search" placeholder="Search products" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
