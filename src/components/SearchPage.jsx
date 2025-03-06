import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';
import './SearchPage.css';
import AnimatedFoodIcons from './AnimatedFoodIcons';

// Memoized AnimatedFoodIconsBackground component to prevent re-renders
const AnimatedFoodIconsBackground = React.memo(({ count }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      <AnimatedFoodIcons count={count} />
    </div>
  );
});

const SearchPage = () => {
  const { theme } = useTheme();
  
  // State for recipes
  const [recipes, setRecipes] = useState([]);
  // State for filters
  const [filters, setFilters] = useState({
    query: '',
    minRating: 0,
    maxCookingTime: 180,
    cuisine: '',
    mealType: '',
    diet: '',
    mainIngredient: '',
    servings: ''
  });
  // State for sorting
  const [sortOption, setSortOption] = useState('rating-desc');
  // State for mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Options for dropdowns (copied from AddRecipePage.jsx)
  const cuisineOptions = [
    'Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 
    'French', 'Mediterranean', 'American', 'Thai', 'Greek', 'Other'
  ];
  
  const mealTypeOptions = [
    'Breakfast', 'Lunch', 'Dinner', 'Appetizer', 'Soup', 
    'Salad', 'Main Course', 'Side Dish', 'Dessert', 'Snack', 'Drink'
  ];
  
  const dietOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Low-Carb', 'Keto', 'Paleo', 'Whole30', 'None'
  ];

  const mainIngredientOptions = [
    'Chicken', 'Beef', 'Pork', 'Fish', 'Seafood', 'Tofu', 
    'Beans', 'Vegetables', 'Pasta', 'Rice', 'Other'
  ];
  
  // Sorting options
  const sortOptions = [
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'rating-asc', label: 'Lowest Rated' },
    { value: 'time-asc', label: 'Shortest Cooking Time' },
    { value: 'time-desc', label: 'Longest Cooking Time' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle sorting change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };
  
  // Load recipes (for demo, we'll generate some mock data)
  useEffect(() => {
    // In a real app, you'd fetch from an API
    // For now, we'll check if there are recipes in localStorage
    // (since AddRecipePage saves recipes there)
    const savedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    
    // If no saved recipes, generate mock data
    if (savedRecipes.length === 0) {
      const mockRecipes = generateMockRecipes(24);
      setRecipes(mockRecipes);
    } else {
      setRecipes(savedRecipes);
    }
  }, []);
  
  // Filter and sort recipes
  const filteredAndSortedRecipes = () => {
    // First apply filters
    let result = recipes.filter(recipe => {
      // Text search
      if (filters.query && !recipe.title.toLowerCase().includes(filters.query.toLowerCase())) {
        return false;
      }
      
      // Rating filter
      if (recipe.rating < filters.minRating) {
        return false;
      }
      
      // Cooking time filter
      if (filters.maxCookingTime < recipe.timeInMins) {
        return false;
      }
      
      // Cuisine filter
      if (filters.cuisine && recipe.fullRecipe && recipe.fullRecipe.cuisine !== filters.cuisine) {
        return false;
      }
      
      // Meal type filter
      if (filters.mealType && recipe.fullRecipe && recipe.fullRecipe.mealType !== filters.mealType) {
        return false;
      }
      
      // Diet filter
      if (filters.diet && recipe.fullRecipe && recipe.fullRecipe.diet !== filters.diet) {
        return false;
      }
      
      // Main ingredient filter
      if (filters.mainIngredient && recipe.fullRecipe && recipe.fullRecipe.mainIngredient !== filters.mainIngredient) {
        return false;
      }
      
      // Servings filter
      if (filters.servings && recipe.servings !== parseInt(filters.servings)) {
        return false;
      }
      
      return true;
    });
    
    // Then apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'rating-desc':
          return b.rating - a.rating;
        case 'rating-asc':
          return a.rating - b.rating;
        case 'time-asc':
          return a.timeInMins - b.timeInMins;
        case 'time-desc':
          return b.timeInMins - a.timeInMins;
        case 'newest':
          return new Date(b.fullRecipe?.dateCreated || 0) - new Date(a.fullRecipe?.dateCreated || 0);
        case 'oldest':
          return new Date(a.fullRecipe?.dateCreated || 0) - new Date(b.fullRecipe?.dateCreated || 0);
        default:
          return 0;
      }
    });
    
    return result;
  };
  
  // Helper to generate mock recipes with more interesting titles
  const generateMockRecipes = (count) => {
    const recipeTitles = [
      "Spicy Turkish Kebabs", "Mediterranean Pasta Salad", "Creamy Mushroom Risotto", 
      "Classic Beef Bourguignon", "Vegetarian Stuffed Peppers", "Thai Red Curry",
      "Homemade Margherita Pizza", "Japanese Miso Ramen", "Greek Moussaka",
      "Vegan Chocolate Cake", "Lemon Garlic Roast Chicken", "Indian Butter Chicken",
      "Crispy Fish Tacos", "Authentic Pad Thai", "French Onion Soup",
      "Fresh Spring Rolls", "Mexican Street Corn", "Spinach and Feta Quiche",
      "Hearty Beef Stew", "Garlic Butter Shrimp Pasta", "Turkish Baklava",
      "Homemade Falafel Bowl", "Quinoa Buddha Bowl", "Classic Cheese Burger"
    ];
    
    const images = [
      "/api/placeholder/320/240",
      "/api/placeholder/320/240",
      "/api/placeholder/320/240"
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: recipeTitles[i % recipeTitles.length],
      image: images[i % images.length],
      timeInMins: Math.floor(Math.random() * 120) + 10,
      rating: (Math.random() * 5).toFixed(1),
      servings: Math.floor(Math.random() * 6) + 1,
      fullRecipe: {
        cuisine: cuisineOptions[Math.floor(Math.random() * cuisineOptions.length)],
        mealType: mealTypeOptions[Math.floor(Math.random() * mealTypeOptions.length)],
        diet: dietOptions[Math.floor(Math.random() * dietOptions.length)],
        mainIngredient: mainIngredientOptions[Math.floor(Math.random() * mainIngredientOptions.length)],
        dateCreated: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      }
    }));
  };
  
  // Get the filtered and sorted recipes
  const displayRecipes = filteredAndSortedRecipes();
  
  // Animation variants for recipe cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Render filter section
  const renderFilters = () => (
    <div 
      className="search-filters"
      style={{ backgroundColor: theme.core.container, color: theme.core.text }}
    >
      <h2 className="filter-heading">Filter Recipes</h2>
      
      {/* Search Input */}
      <div className="filter-section">
        <label className="filter-label">Search</label>
        <input
          type="text"
          name="query"
          value={filters.query}
          onChange={handleFilterChange}
          className="border-2 filter-input"
          placeholder="Search recipes..."
          style={{ 
            borderColor: theme.core.text,
            backgroundColor: theme.headerfooter.searchBox || 'rgba(255,255,255,0.1)',
            color: theme.core.text
          }}
        />
      </div>
      
      {/* Rating Filter */}
      <div className="filter-section">
        <label className="filter-label">Minimum Rating</label>
        <div className="filter-slider-container">
          <input
            type="range"
            name="minRating"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={handleFilterChange}
            className="filter-slider"
          />
          <span className="filter-value-badge" style={{ backgroundColor: theme.core.containerHoover }}>
            {filters.minRating} ★
          </span>
        </div>
      </div>
      
      {/* Cooking Time Filter */}
      <div className="filter-section">
        <label className="filter-label">Maximum Cooking Time</label>
        <div className="filter-slider-container">
          <input
            type="range"
            name="maxCookingTime"
            min="10"
            max="180"
            step="10"
            value={filters.maxCookingTime}
            onChange={handleFilterChange}
            className="filter-slider"
          />
          <span className="filter-value-badge" style={{ backgroundColor: theme.core.containerHoover }}>
            {filters.maxCookingTime} min
          </span>
        </div>
      </div>
      
      {/* Cuisine Filter */}
      <div className="filter-section">
        <label className="filter-label">Cuisine</label>
        <select
          name="cuisine"
          value={filters.cuisine}
          onChange={handleFilterChange}
          className="border-2 filter-input"
          style={{ 
            borderColor: theme.core.text,
            backgroundColor: theme.headerfooter.searchBox || 'rgba(255,255,255,0.1)',
          }}
        >
          <option value="">All Cuisines</option>
          {cuisineOptions.map(option => (
            <option key={option} value={option} style={{ color: theme.headerfooter.logoRed || "#c0392b" }}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      {/* Meal Type Filter */}
      <div className="filter-section">
        <label className="filter-label">Meal Type</label>
        <select
          name="mealType"
          value={filters.mealType}
          onChange={handleFilterChange}
          className="border-2 filter-input"
          style={{ 
            borderColor: theme.core.text,
            backgroundColor: theme.headerfooter.searchBox || 'rgba(255,255,255,0.1)'
          }}
        >
          <option value="">All Meal Types</option>
          {mealTypeOptions.map(option => (
            <option key={option} value={option} style={{ color: theme.headerfooter.logoRed || "#c0392b" }}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      {/* Diet Filter */}
      <div className="filter-section">
        <label className="filter-label">Diet</label>
        <select
          name="diet"
          value={filters.diet}
          onChange={handleFilterChange}
          className="border-2 filter-input"
          style={{ 
            borderColor: theme.core.text,
            backgroundColor: theme.headerfooter.searchBox || 'rgba(255,255,255,0.1)'
          }}
        >
          <option value="">All Diets</option>
          {dietOptions.map(option => (
            <option key={option} value={option} style={{ color: theme.headerfooter.logoRed || "#c0392b" }}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      {/* Main Ingredient Filter */}
      <div className="filter-section">
        <label className="filter-label">Main Ingredient</label>
        <select
          name="mainIngredient"
          value={filters.mainIngredient}
          onChange={handleFilterChange}
          className="border-2 filter-input"
          style={{ 
            borderColor: theme.core.text,
            backgroundColor: theme.headerfooter.searchBox || 'rgba(255,255,255,0.1)'
          }}
        >
          <option value="">All Ingredients</option>
          {mainIngredientOptions.map(option => (
            <option key={option} value={option} style={{ color: theme.headerfooter.logoRed || "#c0392b" }}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      {/* Servings Filter */}
      <div className="filter-section">
        <label className="filter-label">Servings</label>
        <select
          name="servings"
          value={filters.servings}
          onChange={handleFilterChange}
          className="border-2 filter-input"
          style={{ 
            borderColor: theme.core.text,
            backgroundColor: theme.headerfooter.searchBox || 'rgba(255,255,255,0.1)'
          }}
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(count => (
            <option key={count} value={count} style={{ color: theme.headerfooter.logoRed || "#c0392b" }}>
              {count}
            </option>
          ))}
        </select>
      </div>
      
      {/* Reset Filters Button */}
      <button
        onClick={() => setFilters({
          query: '',
          minRating: 0,
          maxCookingTime: 180,
          cuisine: '',
          mealType: '',
          diet: '',
          mainIngredient: '',
          servings: ''
        })}
        className="filter-reset-button"
        style={{ 
          backgroundColor: theme.headerfooter.logoRed || "#c0392b",
          color: 'white',
          borderColor: theme.core.text
        }}
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="overflow-hidden" style={{ backgroundColor: theme.core.containerHoover, color: theme.core.text }}>
      {/* Hero Section */}
      <div 
        className="hero-section"
        style={{ backgroundColor: theme.core.container }}
      >
        <div className="hero-background">
          <div className="hero-pattern bg-pattern"></div>
          <AnimatedFoodIconsBackground count={45} />
        </div>

        <motion.div 
          className="hero-content container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Discover <span className="text-gradient" style={{ backgroundImage: `linear-gradient(15deg, ${theme.headerfooter.logoRed || "#c0392b"}, ${theme.core.text})` }}>Recipes</span>
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Find the perfect recipe for any occasion, cuisine, or dietary preference
          </motion.p>
        </motion.div>
      </div>

      {/* Curved section divider */}
      <div className="curve-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path 
            fill={theme.core.container} 
            fillOpacity="1" 
            d="M0,32L40,48C80,64,160,96,240,101.3C320,107,400,85,480,80C560,75,640,85,720,96C800,107,880,117,960,106.7C1040,96,1120,64,1200,53.3C1280,43,1360,53,1400,58.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
        </svg>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Toggle Button (visible only on small screens) */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleMobileFilters}
            className="mobile-filter-toggle"
            style={{ 
              backgroundColor: theme.core.container, 
              color: theme.core.text,
              borderColor: theme.core.text
            }}
          >
            <span className="mr-2">
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              viewBox="0 0 16 16"
              className={`toggle-icon ${showMobileFilters ? 'toggle-icon-open' : ''}`}
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </button>
        </div>
        
        {/* Mobile Filters (visible when toggled) */}
        <div className={`md:hidden mb-6 ${showMobileFilters ? 'block' : 'hidden'}`}>
          {renderFilters()}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filter Sidebar (always visible on larger screens) */}
          <div className="hidden md:block md:w-1/4">
            {renderFilters()}
          </div>
          
          {/* Main Content Area */}
          <div className="md:w-3/4">
            {/* Header with sort options */}
            <div 
              className="recipe-header"
              style={{ backgroundColor: theme.core.container, color: theme.core.text }}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <h2 className="text-2xl font-bold">Browse Recipes</h2>
                <span className="recipe-count-badge" style={{ backgroundColor: theme.core.containerHoover }}>
                  {displayRecipes.length} results
                </span>
              </div>
              <div className="sort-container">
                <label className="sort-label">Sort by:</label>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="sort-select"
                  style={{ 
                    borderColor: theme.core.text,
                    backgroundColor: theme.headerfooter.searchBox || 'rgba(255,255,255,0.1)'
                  }}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Recipe Grid */}
            {displayRecipes.length > 0 ? (
              <motion.div 
                className="recipe-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {displayRecipes.map(recipe => (
                  <motion.div key={recipe.id} variants={cardVariants}>
                    <RecipeCard
                      title={recipe.title}
                      image={recipe.image}
                      timeInMins={recipe.timeInMins}
                      rating={recipe.rating}
                      servings={recipe.servings}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div 
                className="empty-state"
                style={{ backgroundColor: theme.core.container, color: theme.core.text }}
              >
                <div className="empty-emoji">🔍</div>
                <h2 className="empty-heading">No Recipes Found</h2>
                <p className="empty-message">We couldn't find any recipes that match your criteria.</p>
                <button
                  onClick={() => setFilters({
                    query: '',
                    minRating: 0,
                    maxCookingTime: 180,
                    cuisine: '',
                    mealType: '',
                    diet: '',
                    mainIngredient: '',
                    servings: ''
                  })}
                  className="empty-reset-button"
                  style={{ 
                    backgroundColor: theme.headerfooter.logoRed || "#c0392b",
                    color: 'white'
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;