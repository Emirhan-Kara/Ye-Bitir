import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import RecipeCard from './RecipeCard';
import AnimatedFoodIcons from './AnimatedFoodIcons';
import { motion } from 'framer-motion';

// Memoized AnimatedFoodIconsBackground component to prevent re-renders
const AnimatedFoodIconsBackground = React.memo(({ count }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      <AnimatedFoodIcons count={count} />
    </div>
  );
});
const mockSavedRecipes = [
  { 
    id: 4, 
    title: 'Creamy Pasta Carbonara with Pancetta', 
    image: 'https://media.istockphoto.com/id/1358851353/photo/spaghetti-alla-carbonara-italian-pasta-dish-with-crispy-bacon-and-parmesan-in-a-black-bowl.jpg?s=612x612&w=0&k=20&c=NxQEpVLhVIhTRtTbfz3SBvZBfcKGh_PxH5-BaUX9dXg=', 
    timeInMins: 25, 
    rating: 4.8, 
    servings: 2 
  },
  { 
    id: 5, 
    title: 'Authentic Chicken Curry with Basmati Rice', 
    image: 'https://media.istockphoto.com/id/1345298959/photo/butter-chicken-or-murgh-makhani.jpg?s=612x612&w=0&k=20&c=_tOaCMQiL2s-8I_1JTohLcv4Jn-VYyPWz2Q6v2B8xP0=', 
    timeInMins: 50, 
    rating: 4.6, 
    servings: 4
  },
  { 
    id: 6, 
    title: 'Mixed Berry Smoothie Bowl with Granola', 
    image: 'https://media.istockphoto.com/id/1411248193/photo/healthy-yogurt-smoothie-bowl-with-berry-fruits.jpg?s=612x612&w=0&k=20&c=7Kew-NeHYIVz1cC7j-3BN0HYiGS-UCQFebaQ-RA2yzk=', 
    timeInMins: 10, 
    rating: 4.3, 
    servings: 1
  },
];

const ProfilePage = ({ initialTab = 'myRecipes' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [userData, setUserData] = useState({
    username: 'Hayrunnisa',
    profileImage: "src/assets/nisa_profilepic.jpg",
    bio: 'Food enjoyer from Kayseri/Türkiye',
    recipesCount: 12,
    savedCount: 34,
  });
  
  // State for recipes - allows us to update them
  const [myRecipes, setMyRecipes] = useState([
    { 
      id: 1, 
      title: 'Homemade Pizza with Fresh Basil and Mozzarella', 
      image: 'https://media.istockphoto.com/id/1349560847/photo/slice-of-hot-pizza-large-cheese-lunch-or-dinner-traditional-italian-food-takeaway-with-melted.jpg?s=612x612&w=0&k=20&c=tUiljxr0yvJ-qsagIwcaNgQD226n6ZYgQIrk1dGk-Zo=', 
      timeInMins: 45, 
      rating: 4.7, 
      servings: 4 
    },
    { 
      id: 2, 
      title: 'Triple Chocolate Cake with Ganache', 
      image: 'https://media.istockphoto.com/id/1311220995/photo/chocolate-birthday-cake-with-chocolate-frosting-and-sprinkles.jpg?s=612x612&w=0&k=20&c=b0qHFczx3TjUG0iKLUB9TN0VVKpFHXQs2tBfW7UO3XI=', 
      timeInMins: 60, 
      rating: 4.9, 
      servings: 8 
    },
    { 
      id: 3, 
      title: 'Beef Stir Fry with Seasonal Vegetables', 
      image: 'https://media.istockphoto.com/id/1309136478/photo/beef-stir-fry-with-green-beans-and-tomatoes.jpg?s=612x612&w=0&k=20&c=WmK_2s3HG2YwbfAzMu-U2GjSuYW_ZuTy9N77wZ_PJHA=', 
      timeInMins: 30, 
      rating: 4.5, 
      servings: 2 
    },
  ]);

  const { theme } = useTheme();
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Refs for scroll animations
  const myRecipesRef = useRef(null);
  const savedRecipesRef = useRef(null);
  const settingsRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Update username based on user email if available
  useEffect(() => {
    if (currentUser && currentUser.email) {
      // Extract username from email (remove @domain.com)
      const username = currentUser.email.split('@')[0];
      // Update the userData with the email or username
      setUserData(prev => ({
        ...prev,
        username: username.charAt(0).toUpperCase() + username.slice(1), // Capitalize first letter
        email: currentUser.email
      }));
    }
  }, [currentUser]);

  // In a real app, this would fetch user data and recipes from an API
  useEffect(() => {
    // Load recipes from localStorage (for demo purposes)
    try {
      const storedRecipes = JSON.parse(localStorage.getItem('myRecipes'));
      if (storedRecipes && storedRecipes.length > 0) {
        // Update myRecipes with stored recipes
        setMyRecipes([...storedRecipes, ...myRecipes.slice(0, Math.max(0, 3 - storedRecipes.length))]);
        
        // Update recipes count
        setUserData(prev => ({
          ...prev,
          recipesCount: storedRecipes.length + myRecipes.length
        }));
      }
    } catch (error) {
      console.error('Error loading recipes from localStorage:', error);
    }
  }, []);

  // Scroll animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (myRecipesRef.current) observer.observe(myRecipesRef.current);
    if (savedRecipesRef.current) observer.observe(savedRecipesRef.current);
    if (settingsRef.current) observer.observe(settingsRef.current);

    return () => {
      if (myRecipesRef.current) observer.unobserve(myRecipesRef.current);
      if (savedRecipesRef.current) observer.unobserve(savedRecipesRef.current);
      if (settingsRef.current) observer.unobserve(settingsRef.current);
    };
  }, [activeTab]);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden" style={{ backgroundColor: theme.core.background, color: theme.core.text }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        {/* Background with animated food icons - Memoized to prevent re-renders */}
        <AnimatedFoodIconsBackground count={60} />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-lg shadow-md p-6 mb-6"
          style={{ backgroundColor: theme.core.container }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 md:mb-0 md:mr-6 relative group"
              >
                <img 
                  src={userData.profileImage || "src/assets/nisa_profilepic.jpg"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <span style={{ color: '#fff' }} className="text-sm font-medium">Change Photo</span>
                </div>
              </motion.div>
              <div className="flex-1 text-center md:text-left">
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-2xl font-bold mb-2"
                  style={{ color: theme.core.text }}
                >
                  {userData.username}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  style={{ color: theme.core.text, opacity: 0.7 }}
                  className="mb-4"
                >
                  {userData.bio}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-wrap justify-center md:justify-start items-center gap-6"
                >
                  <div className="text-center">
                    <p className="font-semibold" style={{ color: theme.core.text }}>{userData.recipesCount}</p>
                    <p className="text-sm" style={{ color: theme.core.text, opacity: 0.7 }}>Recipes</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold" style={{ color: theme.core.text }}>{userData.savedCount}</p>
                    <p className="text-sm" style={{ color: theme.core.text, opacity: 0.7 }}>Saved</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Add New Recipe button and Logout button positioned to the right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 md:mt-0 flex flex-col gap-3"
            >
              <Link 
                to="/add-recipe" 
                className="px-4 py-2 rounded-md flex items-center transition-all duration-300 hover:shadow-lg no-underline"
                style={{ 
                  backgroundColor: theme.headerfooter.logoRed, 
                  color: '#fff',
                  transform: 'scale(1)',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Recipe
              </Link>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="px-4 py-2 rounded-md flex items-center transition-all duration-300 hover:shadow-lg cursor-pointer hover:scale-105"
                style={{ 
                  backgroundColor: theme.core.containerHoover, 
                  color: theme.core.text,
                  transform: 'scale(1)',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-lg shadow-md mb-6 overflow-hidden"
          style={{ backgroundColor: theme.core.container }}
        >
          <div className="flex border-b" style={{ borderColor: `${theme.core.containerHoover}50` }}>
            <button 
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-inner ${activeTab === 'myRecipes' ? 'border-b-2' : ''}`}
              style={{ 
                color: theme.core.text,
                borderColor: activeTab === 'myRecipes' ? theme.headerfooter.logoRed : 'transparent'
              }}
              onClick={() => setActiveTab('myRecipes')}
            >
              My Recipes
            </button>
            <button 
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-inner ${activeTab === 'savedRecipes' ? 'border-b-2' : ''}`}
              style={{ 
                color: theme.core.text,
                borderColor: activeTab === 'savedRecipes' ? theme.headerfooter.logoRed : 'transparent'
              }}
              onClick={() => setActiveTab('savedRecipes')}
            >
              Saved Recipes
            </button>
            <button 
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-inner ${activeTab === 'settings' ? 'border-b-2' : ''}`}
              style={{ 
                color: theme.core.text,
                borderColor: activeTab === 'settings' ? theme.headerfooter.logoRed : 'transparent'
              }}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
        </motion.div>

        {/* Content based on active tab */}
        {activeTab === 'myRecipes' && (
          <div ref={myRecipesRef} className="opacity-0 transition-opacity duration-1000 px-6">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {myRecipes.map(recipe => (
                <motion.div key={recipe.id} variants={itemVariants} className="flex justify-center">
                  <Link to={`/recipe/${recipe.id}`}>
                    <RecipeCard 
                      title={recipe.title}
                      image={recipe.image}
                      timeInMins={recipe.timeInMins}
                      rating={recipe.rating}
                      servings={recipe.servings}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {activeTab === 'savedRecipes' && (
          <div ref={savedRecipesRef} className="opacity-0 transition-opacity duration-1000 px-6">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {mockSavedRecipes.map(recipe => (
                <motion.div key={recipe.id} variants={itemVariants} className="flex justify-center">
                  <Link to={`/recipe/${recipe.id}`}>
                    <RecipeCard 
                      title={recipe.title}
                      image={recipe.image}
                      timeInMins={recipe.timeInMins}
                      rating={recipe.rating}
                      servings={recipe.servings}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div ref={settingsRef} className="opacity-0 transition-opacity duration-1000">
            <div 
              className="rounded-lg shadow-md p-6"
              style={{ backgroundColor: theme.core.container }}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-semibold mb-6"
                style={{ color: theme.core.text }}
              >
                Account Settings
              </motion.h2>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="border-b pb-6" 
                  style={{ borderColor: `${theme.core.containerHoover}40` }}
                >
                  <h3 
                    className="text-lg font-medium mb-4"
                    style={{ color: theme.core.text }}
                  >
                    Profile Information
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label 
                        className="block mb-2"
                        style={{ color: theme.core.text }}
                      >
                        Username
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        style={{ 
                          backgroundColor: theme.headerfooter.searchBox,
                          borderColor: theme.core.containerHoover,
                          color: theme.core.text
                        }}
                        defaultValue={userData.username}
                      />
                    </div>
                    <div>
                      <label 
                        className="block mb-2"
                        style={{ color: theme.core.text }}
                      >
                        Bio
                      </label>
                      <textarea 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        style={{ 
                          backgroundColor: theme.headerfooter.searchBox,
                          borderColor: theme.core.containerHoover,
                          color: theme.core.text
                        }}
                        rows="3"
                        defaultValue={userData.bio}
                      />
                    </div>
                    <div>
                      <label 
                        className="block mb-2"
                        style={{ color: theme.core.text }}
                      >
                        Email
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        style={{ 
                          backgroundColor: theme.headerfooter.searchBox,
                          borderColor: theme.core.containerHoover,
                          color: theme.core.text
                        }}
                        defaultValue={userData.email || "user@example.com"}
                        readOnly={!!userData.email}
                      />
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <button 
                        type="button"
                        className="px-4 py-2 rounded-md focus:outline-none transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
                        style={{ backgroundColor: theme.headerfooter.logoRed, color: '#fff' }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h3 
                    className="text-lg font-medium mb-4"
                    style={{ color: theme.core.text }}
                  >
                    Account Actions
                  </h3>
                  <div className="space-y-4">
                    <button 
                      className="flex items-center transition-all duration-300 hover:translate-x-2 hover:font-medium p-2 rounded-md hover:bg-opacity-10 hover:bg-white"
                      style={{ color: theme.headerfooter.logoRed }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Change Password
                    </button>
                    <button 
                      className="flex items-center transition-all duration-300 hover:translate-x-2 hover:font-medium p-2 rounded-md hover:bg-opacity-10 hover:bg-white"
                      style={{ color: theme.headerfooter.logoRed }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Account
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center transition-all duration-300 hover:translate-x-2 hover:font-medium p-2 rounded-md hover:bg-opacity-10 hover:bg-white"
                      style={{ color: theme.headerfooter.logoRed }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bg-pattern {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;