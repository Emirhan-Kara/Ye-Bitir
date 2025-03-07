import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import RecipeCard from './RecipeCard';
import SuggestionsSection from './SuggestionsSection';
import './home.css';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, {
        threshold: 0.1
      });
      
      reveals.forEach(reveal => {
        observer.observe(reveal);
      });
      
      return () => {
        reveals.forEach(reveal => {
          observer.unobserve(reveal);
        });
      };
    };
    
    animateOnScroll();
    
    // Clean up observer when component unmounts
    return () => {
      const reveals = document.querySelectorAll('.reveal');
      if (reveals && reveals.length > 0) {
        const observer = new IntersectionObserver(() => {});
        reveals.forEach(reveal => {
          observer.unobserve(reveal);
        });
      }
    };
  }, []);
};

// Recipe data that would normally come from an API or database
const dummyRecipes = [
  {
    id: 1,
    title: "Mediterranean Grilled Chicken Salad",
    image: "/api/placeholder/400/300",
    timeInMins: 35,
    rating: 4.7,
    servings: 2,
    categories: {
      cuisine: "World",
      mealType: "Salads",
      diet: "Low-Carb",
      mainIngredient: "Chicken"
    },
    headerImage: "/api/placeholder/800/400"
  },
  {
    id: 2,
    title: "Creamy Mushroom Risotto",
    image: "/api/placeholder/400/300",
    timeInMins: 45,
    rating: 4.8,
    servings: 4,
    categories: {
      cuisine: "Italian",
      mealType: "Main Course",
      diet: "Vegetarian",
      mainIngredient: "Rice"
    },
    headerImage: "/src/assets/image.png"
  },
  {
    id: 3,
    title: "Spicy Chocolate Brownies",
    image: "/api/placeholder/400/300",
    timeInMins: 40,
    rating: 4.9,
    servings: 12,
    categories: {
      cuisine: "American",
      mealType: "Dessert",
      diet: "Indulgent",
      mainIngredient: "Chocolate"
    },
    headerImage: "/api/placeholder/800/400"
  }
];

// Create more recipes by duplicating and modifying the existing ones
const generateMoreRecipes = (baseRecipes, count) => {
  const extendedRecipes = [...baseRecipes];
  let currentId = baseRecipes.length + 1;
  
  while (extendedRecipes.length < count) {
    // Clone a random recipe from the base set
    const randomIndex = Math.floor(Math.random() * baseRecipes.length);
    const clonedRecipe = { ...baseRecipes[randomIndex] };
    
    // Modify just enough to make it appear different
    clonedRecipe.id = currentId++;
    
    // Add some variation to the title
    const variations = ["Homestyle", "Easy", "Quick", "Deluxe", "Classic", "Gourmet"];
    const randomVariation = variations[Math.floor(Math.random() * variations.length)];
    clonedRecipe.title = `${randomVariation} ${clonedRecipe.title}`;
    
    // Slightly change the rating
    clonedRecipe.rating = 4;
    
    // Slightly change the time
    clonedRecipe.timeInMins = 45;
    
    extendedRecipes.push(clonedRecipe);
  }
  
  return extendedRecipes;
};

// Home page component with updated design
const Home = () => {
  const { theme } = useTheme();
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  useScrollAnimation();
  
  // Generate more recipes
  const extendedRecipes = generateMoreRecipes(dummyRecipes, 12);
  
  // Categorized recipes
  const italianRecipes = extendedRecipes.filter(recipe => recipe.categories.cuisine === "Italian");
  const americanRecipes = extendedRecipes.filter(recipe => recipe.categories.cuisine === "American");
  const worldRecipes = extendedRecipes.filter(recipe => recipe.categories.cuisine === "World");
  
  // Meal type recipes
  const dessertRecipes = extendedRecipes.filter(recipe => recipe.categories.mealType === "Dessert");
  const mainCourseRecipes = extendedRecipes.filter(recipe => recipe.categories.mealType === "Main Course");
  const saladRecipes = extendedRecipes.filter(recipe => recipe.categories.mealType === "Salads");
  
  // Diet specific recipes
  const vegetarianRecipes = extendedRecipes.filter(recipe => recipe.categories.diet === "Vegetarian");
  const lowCarbRecipes = extendedRecipes.filter(recipe => recipe.categories.diet === "Low-Carb");
  
  // Main ingredient recipes
  const chickenRecipes = extendedRecipes.filter(recipe => recipe.categories.mainIngredient === "Chicken");
  const riceRecipes = extendedRecipes.filter(recipe => recipe.categories.mainIngredient === "Rice");
  const chocolateRecipes = extendedRecipes.filter(recipe => recipe.categories.mainIngredient === "Chocolate");
  
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    navigate(`/search?q=${searchQuery}`);
  };
  
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero section with wavy shapes - Fixed curve separation issue */}
      <section className="w-full relative overflow-hidden pb-24">
        <div className="container mx-auto px-4 py-12 text-center relative z-10"
                style={{backgroundColor: theme.core.container}}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
            <span style={{ color: theme.core.text }}> Welcome to </span>
            <span style={{ color: theme.headerfooter.logoRed }}>Ye</span>
            <span style={{ color: theme.core.text }}> Bitir</span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 animate-fadeIn delay-200" style={{ color: theme.core.text, opacity: 0.8 }}>
            Discover amazing recipes from around the world, share your own creations, and connect with food lovers.
          </p>
          
          {/* Search box - Fixed responsiveness issues */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10 animate-fadeIn delay-300 px-4">
            <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-full shadow-lg">
              <input 
                type="text" 
                name="search"
                placeholder="Search for recipes, ingredients, cuisines..." 
                className="w-full sm:w-auto flex-grow px-6 py-3 text-lg rounded-full focus:outline-none"
              />
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-full text-white font-semibold transition-transform hover:scale-105"
                style={{ backgroundColor: theme.headerfooter.logoRed }}
              >
                Search
              </button>
            </div>
          </form>
          
          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 animate-fadeIn delay-400 px-4">
            <Link 
              to="/recipe-wheel" 
              className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105 flex items-center justify-center"
              style={{ backgroundColor: theme.core.accent, color: 'white' }}
            >
              <span>Try Recipe Wheel</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            {!isLoggedIn && (
              <Link 
                to="/signup" 
                className="w-full sm:w-auto px-8 py-3 rounded-full border-2 font-semibold transition-transform hover:scale-105"
                style={{ borderColor: theme.core.accent, color: theme.core.text }}
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
        
        {/* Bottom wavy shape - Fixed connection */}
        <div className="absolute bottom-0 left-0 w-full transform rotate-180 overflow-hidden mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
                fill={theme.core.container} 
                fillOpacity="1" 
                d="M0,32L40,48C80,64,160,96,240,101.3C320,107,400,85,480,80C560,75,640,85,720,96C800,107,880,117,960,106.7C1040,96,1120,64,1200,53.3C1280,43,1360,53,1400,58.7L1440,64L1440,120L1400,120C1360,120,1280,120,1200,120C1120,120,1040,120,960,120C880,120,800,120,720,120C640,120,560,120,480,120C400,120,320,120,240,120C160,120,80,120,40,120L0,120Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Featured recipes section with edgy container - 4 recipes per column */}
      <section className="py-12 mb-10 reveal">
        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Edgy container shape */}
          <div className="absolute inset-0 -skew-y-1 rounded-3xl" style={{ backgroundColor: theme.core.containerHoover, zIndex: -1 }}></div>
          
          <h2 className="text-4xl font-bold mb-8 pt-8 text-center" style={{ color: theme.core.text }}>
            Featured Recipes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center p-6 pb-12">
            {/* Column 1 - 4 recipes */}
            <div className="space-y-6">
              {extendedRecipes.slice(0, 4).map(recipe => (
                <Link 
                  key={recipe.id}
                  to={`/recipe/${recipe.id}`}
                  className="no-underline block w-full"
                >
                  <div 
                    className="cursor-pointer transition-transform hover:scale-105 rounded-2xl overflow-hidden mx-auto"
                  >
                    <RecipeCard
                      title={recipe.title}
                      image={recipe.image}
                      timeInMins={recipe.timeInMins}
                      rating={recipe.rating}
                      servings={recipe.servings}
                    />
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Column 2 - 4 recipes */}
            <div className="space-y-6">
              {extendedRecipes.slice(4, 8).map(recipe => (
                <Link 
                  key={recipe.id}
                  to={`/recipe/${recipe.id}`}
                  className="no-underline block w-full"
                >
                  <div 
                    className="cursor-pointer transition-transform hover:scale-105 rounded-2xl overflow-hidden mx-auto"
                  >
                    <RecipeCard
                      title={recipe.title}
                      image={recipe.image}
                      timeInMins={recipe.timeInMins}
                      rating={recipe.rating}
                      servings={recipe.servings}
                    />
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Column 3 - 4 recipes */}
            <div className="space-y-6 md:col-span-2 lg:col-span-1">
              {extendedRecipes.slice(8, 12).map(recipe => (
                <Link 
                  key={recipe.id}
                  to={`/recipe/${recipe.id}`}
                  className="no-underline block w-full"
                >
                  <div 
                    className="cursor-pointer transition-transform hover:scale-105 rounded-2xl overflow-hidden mx-auto"
                  >
                    <RecipeCard
                      title={recipe.title}
                      image={recipe.image}
                      timeInMins={recipe.timeInMins}
                      rating={recipe.rating}
                      servings={recipe.servings}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      
      
      {/* Cuisine categories with wavy container */}
      <section className="py-16 px-4 mb-16 relative reveal">
        {/* Wavy top border */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  fill={theme.core.container} 
                  fillOpacity="1">
            </path>
          </svg>
        </div>
        
        {/* Background */}
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: theme.core.container }}></div>
        
        <div className="container mx-auto pt-8">
          <h2 className="text-4xl font-bold mb-10 text-center" style={{ color: theme.core.text }}>
            Explore Cuisines
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Italian Cuisine */}
            <div className="rounded-2xl overflow-hidden shadow-lg p-6 transform hover:scale-102 transition-transform"
                 style={{ 
                   backgroundColor: theme.core.containerHoover,
                 }}>
              <h3 className="text-center text-2xl font-bold mb-4" style={{ color: theme.headerfooter.logoRed }}>
                Italian
              </h3>
              <div className="space-y-4">
                {italianRecipes.slice(0, 3).map(recipe => (
                  <Link 
                    key={recipe.id}
                    to={`/recipe/${recipe.id}`}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-400 no-underline"
                  >
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium" style={{ color: theme.core.text }}>{recipe.title}</h4>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm" style={{ color: theme.core.text, opacity: 0.8 }}>
                          {recipe.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link 
                to="/search?cuisine=Italian" 
                className="inline-block mt-4 text-sm font-semibold hover:scale-115"
                style={{ color: theme.core.text }}
              >
                View all Italian recipes →
              </Link>
            </div>
            
            {/* American Cuisine */}
            <div className="rounded-2xl overflow-hidden shadow-lg p-6 transform hover:scale-102 transition-transform"
                 style={{ 
                    backgroundColor: theme.core.containerHoover,
                 }}>
              <h3 className="text-center text-2xl font-bold mb-4" style={{ color: theme.headerfooter.logoRed }}>
                American
              </h3>
              <div className="space-y-4">
                {americanRecipes.slice(0, 3).map(recipe => (
                  <Link 
                    key={recipe.id}
                    to={`/recipe/${recipe.id}`}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-400 no-underline"
                  >
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium" style={{ color: theme.core.text }}>{recipe.title}</h4>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm" style={{ color: theme.core.text, opacity: 0.8 }}>
                          {recipe.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link 
                to="/search?cuisine=American" 
                className="inline-block mt-4 text-sm font-semibold hover:scale-115"
                style={{ color: theme.core.text }}
              >
                View all American recipes →
              </Link>
            </div>
            
            {/* World Cuisine */}
            <div className="rounded-2xl overflow-hidden shadow-lg p-6 transform hover:scale-102 transition-transform"
                 style={{ 
                    backgroundColor: theme.core.containerHoover,
                 }}>
              <h3 className="text-center text-2xl font-bold mb-4" style={{ color: theme.headerfooter.logoRed }}>
                World
              </h3>
              <div className="space-y-4">
                {worldRecipes.slice(0, 3).map(recipe => (
                  <Link 
                    key={recipe.id}
                    to={`/recipe/${recipe.id}`}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-400 no-underline"
                  >
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium" style={{ color: theme.core.text }}>{recipe.title}</h4>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm" style={{ color: theme.core.text, opacity: 0.8 }}>
                          {recipe.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link 
                to="/search?cuisine=World" 
                className="inline-block mt-4 text-sm font-semibold hover:scale-115"
                style={{ color: theme.core.text }}
              >
                View all World recipes →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wavy bottom border */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden transform rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  fill={theme.core.container} 
                  fillOpacity="1">
            </path>
          </svg>
        </div>
      </section>
      
      {/* Diet-specific section with diagonal edges */}
      <section className="container mx-auto px-4 py-12 mb-16 reveal relative">
        <div className="max-w-7xl mx-auto relative">
          {/* Diagonal edge container */}
          <div className="absolute inset-0 -skew-y-2 rounded-3xl" 
               style={{ 
                 backgroundColor: theme.core.container, 
                 zIndex: -1,
                 transform: 'skewY(-2deg)'
               }}>
          </div>
          
          <div className="py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold" style={{ color: theme.core.text }}>
                Recipes by Diet
              </h2>
              <Link 
                to="/search" 
                className="text-lg font-semibold mt-2 md:mt-0"
                style={{ color: theme.core.accent }}
              >
                View all categories →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vegetarian */}
              <div className="relative rounded-2xl overflow-hidden h-64 group">
                <img 
                  src="/api/placeholder/800/400" 
                  alt="Vegetarian" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Vegetarian</h3>
                  <p className="text-white text-opacity-80 mb-4">Delicious meat-free recipes</p>
                  <Link 
                    to="/search?diet=Vegetarian" 
                    className="inline-block px-6 py-2 rounded-full bg-white/90 text-black font-semibold transition-transform hover:scale-105 text-center"
                  >
                    Explore Recipes
                  </Link>
                </div>
              </div>
              
              {/* Low-Carb */}
              <div className="relative rounded-2xl overflow-hidden h-64 group">
                <img 
                  src="/api/placeholder/800/400" 
                  alt="Low-Carb" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Low-Carb</h3>
                  <p className="text-white text-opacity-80 mb-4">Healthy and satisfying options</p>
                  <Link 
                    to="/search?diet=Low-Carb" 
                    className="inline-block px-6 py-2 rounded-full bg-white/90 text-black font-semibold transition-transform hover:scale-105 text-center"
                  >
                    Explore Recipes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meal Types with hexagonal pattern */}
      <section className="py-16 px-4 mb-16 reveal relative">
        {/* Hexagonal pattern background */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundColor: theme.core.container,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.3v34.6L30 60 0 51.9V17.3L30 0zm0 5.3L5.3 19.4v30.2L30 54.7l24.7-5.1V19.4L30 5.3z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: theme.core.text }}>
            Browse by Meal Type
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Desserts */}
            <div className="rounded-2xl overflow-hidden shadow-lg relative h-48 group">
              <img 
                src="/api/placeholder/800/400" 
                alt="Desserts" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">Desserts</h3>
                <p className="text-white/90 mb-2 text-sm">{dessertRecipes.length} recipes</p>
                <Link 
                  to="/search?mealType=Dessert" 
                  className="text-white/90 font-medium text-sm inline-flex items-center hover:text-white"
                >
                  View all 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Main Courses */}
            <div className="rounded-2xl overflow-hidden shadow-lg relative h-48 group">
              <img 
                src="/api/placeholder/800/400" 
                alt="Main Courses" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">Main Courses</h3>
                <p className="text-white/90 mb-2 text-sm">{mainCourseRecipes.length} recipes</p>
                <Link 
                  to="/search?mealType=Main Course" 
                  className="text-white/90 font-medium text-sm inline-flex items-center hover:text-white"
                >
                  View all 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Salads */}
            <div className="rounded-2xl overflow-hidden shadow-lg relative h-48 group">
              <img 
                src="/api/placeholder/800/400" 
                alt="Salads" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">Salads</h3>
                <p className="text-white/90 mb-2 text-sm">{saladRecipes.length} recipes</p>
                <Link 
                  to="/search?mealType=Salads" 
                  className="text-white/90 font-medium text-sm inline-flex items-center hover:text-white"
                >
                  View all 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action section with wave pattern */}
      <section className="py-16 relative overflow-hidden reveal" style={{ backgroundColor: theme.headerfooter.logoRed }}>
        {/* Top wavy border */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-white opacity-10">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                  fill="#FFFFFF" 
                  opacity="0.2">
            </path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                  fill="#FFFFFF" 
                  opacity="0.5">
            </path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Share Your Culinary Masterpieces</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white text-opacity-90">
            Join our community of food enthusiasts and share your favorite recipes with people around the world.
          </p>
          {isLoggedIn ? (
            <Link 
              to="/add-recipe" 
              className="inline-block px-8 py-3 bg-white text-lg rounded-full font-semibold transition-transform hover:scale-105"
              style={{ color: theme.headerfooter.logoRed }}
            >
              Add Your Recipe
            </Link>
          ) : (
            <Link 
              to="/signup" 
              className="inline-block px-8 py-3 bg-white text-lg rounded-full font-semibold transition-transform hover:scale-105"
              style={{ color: theme.headerfooter.logoRed }}
            >
              Join Now
            </Link>
          )}
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white opacity-10"></div>
        
        {/* Bottom wavy border */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden transform rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-white opacity-10">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                  fill="#FFFFFF" 
                  opacity="0.2">
            </path>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Home;