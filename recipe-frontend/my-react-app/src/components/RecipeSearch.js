import React, { useState } from 'react';
import axios from 'axios';

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [tags, setTags] = useState('');
  const [recipe, setRecipe] = useState(null);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the ingredients and tags to the backend
      const response = await axios.post('http://localhost:5000/generate-recipe', {
        ingredients: ingredients.split(','),
        tags: tags.split(',')
      });
      setRecipe(response.data.recipe); // Set the recipe received from the backend
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  return (
    <div className="recipe-search-container">
      <h2>Find a Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingredients (comma separated):</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., tomato, garlic, basil"
          />
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., vegan, quick"
          />
        </div>
        <button type="submit">Get Recipe</button>
      </form>

      {recipe && (
        <div className="recipe-result">
          <h3>{recipe.title}</h3>
          <p><strong>Ingredients:</strong></p>
          <pre>{recipe.ingredients}</pre>
          <p><strong>Instructions:</strong></p>
          <pre>{recipe.instructions}</pre>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
