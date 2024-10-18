# Recipe Recommendation and Meal Planner Application

## Overview
The **Recipe Recommendation and Meal Planner Application** is a full-stack web application designed to help users find recipes, plan their meals, and get personalized recommendations. The application utilizes user inputs such as dietary preferences, available ingredients, and AI-based recommendations to provide creative and tailored meal suggestions.

## Features
1. **User Authentication**: Allow users to create accounts, manage profiles, and store meal preferences.
2. **Recipe Search & Filtering**: Users can search recipes by cuisine, dietary restrictions, and meal types.
3. **Meal Planner**: Schedule meals for a week and create an organized meal plan.
4. **AI-Powered Recipe Recommendations**: AI-based suggestions using ChatGPT to provide meal ideas based on user-selected tags and available ingredients.
5. **Ingredient Management**: Users can input ingredients they have, and the app will suggest recipes they can make.
6. **Save & Share Recipes**: Save favorite recipes for future reference and share them with others.

## Technology Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **AI Component**: OpenAI API for recipe recommendations
- **Containerization**: Docker
- **Deployment**: AWS or Azure

## Project Structure
```
RecipeApp/
|-- recipe-frontend/         # React.js frontend
|-- recipe-backend/          # Node.js backend
|-- Dockerfile               # Docker configuration for containerization
|-- README.md                # Project overview and documentation (this file)
```

## Installation and Setup
### Prerequisites
- **Node.js** and **npm**: To run the backend and frontend.
- **Docker**: To containerize the services.
- **MySQL**: For database setup.
- **OpenAI API Key**: Needed for integrating the AI recommendation feature.

### Steps
1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd RecipeApp
   ```

2. **Setup Backend**
   - Navigate to the backend directory:
     ```sh
     cd recipe-backend
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Create a `.env` file to store your environment variables:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=recipe_app
     OPENAI_API_KEY=your_openai_api_key
     ```
   - Start the backend server:
     ```sh
     npm run dev
     ```

3. **Setup Frontend**
   - Navigate to the frontend directory:
     ```sh
     cd ../recipe-frontend
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the frontend development server:
     ```sh
     npm start
     ```

4. **Run with Docker**
   - Make sure Docker is installed and running.
   - Build and run the containers:
     ```sh
     docker-compose up --build
     ```

## Using the Application
1. **Register or Login**: Create an account or login to start using the features.
2. **Search and Plan**: Use the search functionality to find recipes that fit your preferences.
3. **Get AI Recommendations**: Select tags (e.g., vegan, gluten-free) and/or input available ingredients to get personalized meal suggestions.
4. **Save and Organize**: Save your favorite recipes and plan your weekly meals.

## Future Enhancements
- **Shopping List Generator**: Automatically generate a shopping list based on the weekly meal plan.
- **Nutritional Analysis**: Provide users with detailed nutritional information for each meal.
- **Recipe Sharing**: Allow users to share their favorite recipes via social media.

## Contributing
Contributions are welcome! Please open an issue to discuss your ideas or submit a pull request.

## Contact
For more information or questions, please contact [Azha Qari](mailto:azhaqari@gatech.edu).
