import React, { useState } from 'react';
import axios from 'axios';

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [tags, setTags] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

// Function to handle form submission
const handleSearch = async (e) => {
  e.preventDefault();
  setLoading(true);
  setRecipes([]);

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await axios.post('http://localhost:5000/generate-recipe', {
        ingredients: ingredients.split(','),
        tags: tags.split(',')
      });
      setRecipes([JSON.parse(response.data.recipe)]);
      break; // Exit loop if successful
    } catch (error) {
      console.error('Error fetching recipes (attempt ' + (attempt + 1) + '):', error);
      if (attempt === 2) {
        alert("Failed to generate a recipe after multiple attempts. Please try again later.");
      }
    }
  }
  
  setLoading(false);
};




  // Function to save a recipe
  const saveRecipe = async (recipe) => {
    try {
      const response = await axios.post('http://localhost:5000/save-recipe', recipe, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // JWT token for authorization
        }
      });
      if (response.status === 201) {
        alert('Recipe saved successfully!');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please try again.');
    }
  };

  return (
    <div>
      <h1>Find a Recipe</h1>
      <form onSubmit={handleSearch}>
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

      {loading ? (
        <div className="loading">Loading recipe...</div> // Loading message or animation
      ) : (
        <>
          <h2>Recipes:</h2>
          <ul>
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <li key={index}>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                  <h4>Instructions:</h4>
                  <ol>
                    {recipe.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>
                  {/* Add Save Recipe Button */}
                  <button onClick={() => saveRecipe(recipe)}>Save Recipe</button>
                </li>
              ))
            ) : (
              <p>No recipes found</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default RecipeSearch;
