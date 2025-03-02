import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';

const RecipeWheel = () => {
  // Navigation
  const navigate = useNavigate();
  
  // Refs
  const wheelRef = useRef(null);
  
  // States
  const [isSpinning, setIsSpinning] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filters, setFilters] = useState({
    cuisine: '',
    mealType: '',
    diet: '',
    mainIngredient: ''
  });
  
  // Dummy data for dropdowns
  const filterOptions = {
    cuisine: ["Any", "Italian", "Mexican", "Chinese", "Indian", "Japanese", "American", "French", "Thai", "Mediterranean", "Turkish", "Korean"],
    mealType: ["Any", "Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Appetizer", "Salad", "Soup", "Main Course", "Side Dish"],
    diet: ["Any", "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Low-Carb", "Keto", "Paleo", "Pescatarian", "Halal", "Kosher"],
    mainIngredient: ["Any", "Chicken", "Beef", "Pork", "Fish", "Shrimp", "Tofu", "Rice", "Pasta", "Potatoes", "Eggs", "Cheese", "Vegetables"]
  };
  
  // Dummy recipe data
  const dummyRecipes = [
    {
      id: 1,
      title: "Mediterranean Grilled Chicken Salad",
      image: "/api/placeholder/400/300",
      timeInMins: 35,
      rating: 4.7,
      servings: 2,
    },
    {
      id: 2,
      title: "Creamy Mushroom Risotto",
      image: "/api/placeholder/400/300",
      timeInMins: 45,
      rating: 4.8,
      servings: 4,
    },
    {
      id: 3,
      title: "Spicy Chocolate Brownies",
      image: "/api/placeholder/400/300",
      timeInMins: 40,
      rating: 4.9,
      servings: 12,
    },
    {
      id: 4,
      title: "Teriyaki Salmon Bowl",
      image: "/api/placeholder/400/300",
      timeInMins: 30,
      rating: 4.6,
      servings: 2,
    },
    {
      id: 5,
      title: "Classic Margherita Pizza",
      image: "/api/placeholder/400/300",
      timeInMins: 50,
      rating: 4.5,
      servings: 4,
    },
    {
      id: 6,
      title: "Vegetable Pad Thai",
      image: "/api/placeholder/400/300",
      timeInMins: 25,
      rating: 4.4,
      servings: 2,
    }
  ];
  
  // Handle input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle wheel spin
  const handleSpin = () => {
    // Reset if already showing a recipe
    if (showRecipe) {
      setShowRecipe(false);
      setTimeout(() => {
        spinWheel();
      }, 300);
      return;
    }
    
    spinWheel();
  };
  
  const spinWheel = () => {
    setIsSpinning(true);
    
    // Simulate wheel spinning with animation
    if (wheelRef.current) {
      // Random number of rotations between 2 and 5
      const rotations = 2 + Math.random() * 3;
      // Convert to degrees (360 degrees per rotation)
      const degrees = rotations * 360;
      // Apply the rotation with CSS
      wheelRef.current.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
      wheelRef.current.style.transform = `rotate(${degrees}deg)`;
    }
    
    // After 3 seconds, stop spinning and show a random recipe
    setTimeout(() => {
      setIsSpinning(false);
      // Select a random recipe from dummyRecipes
      const randomIndex = Math.floor(Math.random() * dummyRecipes.length);
      setSelectedRecipe(dummyRecipes[randomIndex]);
      setShowRecipe(true);
    }, 3000);
  };
  
  // Reset wheel rotation when starting a new spin
  useEffect(() => {
    if (!isSpinning && !showRecipe && wheelRef.current) {
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
  }, [isSpinning, showRecipe]);
  
  // Function to navigate to the recipe page
  const viewRecipeDetails = () => {
    if (selectedRecipe) {
      navigate(`/recipe/${selectedRecipe.id}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-300 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-red-800 mb-8 text-center">Recipe Wheel</h1>
        <p className="text-xl text-gray-700 mb-8 text-center">
          Select your preferences and spin the wheel to discover your next meal!
        </p>
        
        {/* Filter selectors */}
        <div className="bg-red-900 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cuisine */}
            <div className="flex flex-col">
              <label className="text-yellow-400 font-semibold mb-2">Cuisine:</label>
              <select 
                name="cuisine"
                value={filters.cuisine}
                onChange={handleFilterChange}
                className="p-2 rounded-lg bg-white text-gray-900"
              >
                {filterOptions.cuisine.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Meal Type */}
            <div className="flex flex-col">
              <label className="text-yellow-400 font-semibold mb-2">Meal Type:</label>
              <select 
                name="mealType"
                value={filters.mealType}
                onChange={handleFilterChange}
                className="p-2 rounded-lg bg-white text-gray-900"
              >
                {filterOptions.mealType.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Diet */}
            <div className="flex flex-col">
              <label className="text-yellow-400 font-semibold mb-2">Diet:</label>
              <select 
                name="diet"
                value={filters.diet}
                onChange={handleFilterChange}
                className="p-2 rounded-lg bg-white text-gray-900"
              >
                {filterOptions.diet.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Main Ingredient */}
            <div className="flex flex-col">
              <label className="text-yellow-400 font-semibold mb-2">Main Ingredient:</label>
              <select 
                name="mainIngredient"
                value={filters.mainIngredient}
                onChange={handleFilterChange}
                className="p-2 rounded-lg bg-white text-gray-900"
              >
                {filterOptions.mainIngredient.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Spin button */}
          <div className="mt-6 flex justify-center">
            <button 
              onClick={handleSpin}
              disabled={isSpinning}
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-full text-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showRecipe ? "Spin Again" : "Spin the Wheel"}
            </button>
          </div>
        </div>
        
        {/* Wheel and Recipe Display */}
        <div className="flex justify-center items-center flex-col">
          {/* Wheel Animation - only show when not displaying a recipe */}
          {!showRecipe && (
            <div className="w-64 h-64 relative mb-8">
              <div 
                ref={wheelRef} 
                className="w-full h-full rounded-full border-8 border-yellow-600 bg-red-900 relative"
                style={{
                  transformOrigin: 'center center',
                }}
              >
                {/* Wheel segments */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={index}
                    className="absolute top-0 left-1/2 h-1/2 w-0.5 bg-yellow-400"
                    style={{
                      transform: `rotate(${index * 45}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  />
                ))}
                
                {/* Center of wheel */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>
              
              {/* Triangle pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-yellow-600"></div>
              </div>
            </div>
          )}
          
          {/* Recipe Card Display - with zoom in animation when recipe is selected */}
          {showRecipe && selectedRecipe && (
            <div className="transition-all duration-500 transform scale-100 hover:scale-105 mb-8">
              {/* Wrap in larger container for styling and transitions */}
              <div className="p-4 bg-white rounded-xl shadow-xl">
                <RecipeCard
                  title={selectedRecipe.title}
                  image={selectedRecipe.image}
                  timeInMins={selectedRecipe.timeInMins}
                  rating={selectedRecipe.rating}
                  servings={selectedRecipe.servings}
                />
                
                {/* View Details Button */}
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={viewRecipeDetails}
                    className="bg-red-800 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-colors"
                  >
                    View Recipe Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeWheel;