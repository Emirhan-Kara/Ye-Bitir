import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import AnimatedFoodIcons from './AnimatedFoodIcons';
import './RecipeWheel.css'; // This now contains all our CSS

// Memoized AnimatedFoodIconsBackground component to prevent re-renders
const AnimatedFoodIconsBackground = React.memo(({ count }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      <AnimatedFoodIcons count={count} />
    </div>
  );
});

const RecipeWheel = () => {
  const { theme } = useTheme();
  const { isLoggedIn, currentUser } = useAuth();
  
  // Navigation
  const navigate = useNavigate();
  
  // Refs
  const wheelRef = useRef(null);
  const recipeCardRef = useRef(null);
  
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
    // Check if user is logged in
    if (!isLoggedIn) {
      // Save current path for redirect after login
      localStorage.setItem('redirectPath', '/recipe-wheel');
      // Redirect to login page
      navigate('/login');
      return;
    }
    
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
      
      // Give a small delay to ensure the recipe card is rendered before scrolling
      setTimeout(() => {
        if (recipeCardRef.current) {
          recipeCardRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' // Center the element in the viewport
          });
        }
      }, 100);
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
  
  // Wheel segment colors
  const wheelSegments = [
    { color: '#ef4444' }, // Red
    { color: '#f97316' }, // Orange
    { color: '#f59e0b' }, // Amber
    { color: '#84cc16' }, // Lime
    { color: '#10b981' }, // Emerald
    { color: '#06b6d4' }  // Cyan
  ];
  
  return (
    <div 
      className="min-h-screen py-8 px-4 relative overflow-hidden"
      style={{ color: theme.core.text, backgroundColor: theme.core.background }}
    >
      {/* Background with animated food icons - Memoized to prevent re-renders */}
      <AnimatedFoodIconsBackground count={60} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="edgy-title text-center mb-8 spin-in">RECIPE WHEEL</h1>
        <p className="text-xl mb-8 text-center fade-in-up">
          Select your preferences and spin the wheel to discover your next meal!
          {!isLoggedIn && (
            <span className="block text-sm mt-2" style={{ color: theme.headerfooter.logoRed }}>
              (You need to login to spin the wheel)
            </span>
          )}
        </p>
        
        {/* Filter selectors */}
        <div className="filter-container rounded-2xl p-6 mb-8 shadow-lg"
             style={{ backgroundColor: theme.core.container, color: theme.core.text }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cuisine */}
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Cuisine:</label>
              <select 
                name="cuisine"
                value={filters.cuisine}
                onChange={handleFilterChange}
                className="filter-select p-2 rounded-lg text-gray-900 cursor-pointer"
                style={{ backgroundColor: theme.core.containerHoover}}
              >
                {filterOptions.cuisine.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Meal Type */}
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Meal Type:</label>
              <select 
                name="mealType"
                value={filters.mealType}
                onChange={handleFilterChange}
                className="filter-select p-2 rounded-lg text-gray-900 cursor-pointer"
                style={{ backgroundColor: theme.core.containerHoover}}
              >
                {filterOptions.mealType.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Diet */}
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Diet:</label>
              <select 
                name="diet"
                value={filters.diet}
                onChange={handleFilterChange}
                className="filter-select p-2 rounded-lg text-gray-900 cursor-pointer"
                style={{ backgroundColor: theme.core.containerHoover}}
              >
                {filterOptions.diet.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            {/* Main Ingredient */}
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Main Ingredient:</label>
              <select 
                name="mainIngredient"
                value={filters.mainIngredient}
                onChange={handleFilterChange}
                className="filter-select p-2 rounded-lg text-gray-900 cursor-pointer" 
                style={{ backgroundColor: theme.core.containerHoover}}
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
              className={`flame-button cursor-pointer font-bold py-3 px-8 rounded-full text-lg ${!isSpinning && !showRecipe ? 'pulse' : ''}`}
              style={{ 
                backgroundColor: theme.core.containerHoover,
                color: theme.core.text,
              }}
            >
              {showRecipe ? "Spin Again" : "Spin the Wheel"}
            </button>
          </div>
        </div>
        
        {/* Wheel and Recipe Display */}
        <div className="wheel-container flex justify-center items-center flex-col">
          {/* Wheel Animation - only show when not displaying a recipe */}
          {!showRecipe && (
            <div className="w-64 h-64 relative mb-8">
              <div 
                ref={wheelRef} 
                className="wheel w-full h-full rounded-full relative overflow-hidden shadow-xl"
                style={{
                  transformOrigin: 'center center',
                  border: `8px solid ${theme.core.text}`,
                  boxShadow: `0 0 20px rgba(0, 0, 0, 0.5), 0 0 30px ${theme.headerfooter.logoRed}40`
                }}
              >
                {/* Colored wheel segments instead of lines */}
                {wheelSegments.map((segment, index) => (
                  <div 
                    key={index}
                    className="wheel-segment absolute w-1/2 h-1/2 top-0 left-1/2"
                    style={{
                      backgroundColor: segment.color,
                      transform: `rotate(${index * 60}deg)`,
                      transformOrigin: 'bottom left',
                      clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                    }}
                  />
                ))}
              </div>
              
              {/* Triangle pointer */}
              <div className="wheel-pointer absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div 
                  className="w-0 h-0"
                  style={{
                    borderLeft: '15px solid transparent',
                    borderRight: '15px solid transparent',
                    borderBottom: `30px solid ${theme.headerfooter.logoRed}`,
                    filter: `drop-shadow(0 0 5px ${theme.headerfooter.logoRed})`
                  }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Recipe Card Display - with zoom in animation when recipe is selected */}
          {showRecipe && selectedRecipe && (
            <div 
              ref={recipeCardRef}
              className="recipe-card-container transition-all duration-500 transform scale-100 hover:scale-105 mb-8 fade-in-up"
            >
              {/* Wrap in larger container for styling and transitions */}
              <div className="recipe-card p-4 rounded-xl shadow-xl" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
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
                    className="recipe-button cursor-pointer py-2 px-6 rounded-lg"
                    style={{
                      backgroundColor: theme.recipecard.component, 
                      color: theme.recipecard.componentText,
                      boxShadow: `0 4px 6px ${theme.headerfooter.logoRed}30`
                    }}
                  >
                    View Recipe Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add background pattern style */}
      <style jsx>{`
        .bg-pattern {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default RecipeWheel;