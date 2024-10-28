import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeSearch from './components/RecipeSearch';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import SavedRecipes from './components/SavedRecipes';
import Navbar from './components/Navbar'; // Import the Navbar component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Add Navbar here so it appears on all pages */}
        <Routes>
          <Route path="/" element={<RecipeSearch />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
