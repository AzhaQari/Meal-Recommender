// src/components/SavedRecipes.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedRecipes = () => {
  // State to store the list of saved recipes
  const [recipes, setRecipes] = useState([]);

  // Function to fetch saved recipes when component mounts
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/saved-recipes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the JWT is stored in localStorage
          }
        });
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div>
      <h2>Saved Recipes</h2>
      <ul>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <li key={index}>
              <h3>{recipe.name}</h3>
              <p>{recipe.ingredients.join(', ')}</p>
              <p>{recipe.instructions}</p>
            </li>
          ))
        ) : (
          <p>No saved recipes found</p>
        )}
      </ul>
    </div>
  );
};

export default SavedRecipes;
