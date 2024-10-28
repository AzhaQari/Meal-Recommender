// src/components/Navbar.js

import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/saved-recipes">Saved Recipes</Link></li> {/* Link to Saved Recipes */}
      </ul>
    </nav>
  );
};

export default Navbar;
