import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Home, UtensilsCrossed, Shuffle, Info, FilePlus, User, LogIn } from 'lucide-react';

const Header = ({ 
  isHomepage = false, 
  isLoggedIn = false, 
  scrollThreshold = 50      // How many pixels to scroll before triggering header hide/show
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only trigger animation if we've scrolled past the threshold amount
      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        // Determine scrolling direction
        const isScrollingDown = currentScrollY > lastScrollY;
        
        // Hide header when scrolling down, show when scrolling up
        setIsVisible(!isScrollingDown);
        
        // Update last scroll position when a transition is triggered
        setLastScrollY(currentScrollY);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollThreshold]);

  // Helper function to determine if a route is active
  const isActiveRoute = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/';
  };
  
  // Handle search submission
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      // navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // PUT DUMMY VALUE FOR NOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      setSearchQuery('');
      navigate(`/recipes`);
    }
  };

  return (
    <header 
      className={`bg-gray-400 text-white p-4 pl-8 pr-8 w-full fixed top-0 z-50 ${
        isVisible 
          ? 'translate-y-0 shadow-md' 
          : '-translate-y-full'
      } transition-all duration-500 ease-in-out`}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Column 1: Logo */}
        <div className="col-span-1 flex items-center">
          <Link to="/" className="flex flex-col items-center">
            <span className="font-bold text-xl text-gray-900" style={{ fontFamily: "'Rubik Doodle Shadow', cursive" }}>
              Ye
            </span>
            <span className="font-bold text-xl text-red-800" style={{ fontFamily: "'Rubik Glitch', cursive" }}>
              Bitir
            </span>
          </Link>
        </div>

        {/* Columns 2-5: Search box (only on non-homepage) */}
        {!isHomepage && (
          <div className="col-span-5 flex items-center pr-16">
            <form onSubmit={handleSearch} className="relative w-full flex">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  placeholder="Search recipes..." 
                  className="bg-white text-gray-900 w-full p-2 rounded-l-lg pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Search className="absolute left-3 top-2.5 text-gray-900" size={16} />
              </div>
              <button 
                type="submit" 
                className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-r-lg transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        )}
        
        {/* Empty space for homepage */}
        {isHomepage && <div className="col-span-5"></div>}

        {/* Columns 7-12: Navigation buttons */}
        <div className="col-span-6 flex justify-between items-center">
          {/* Home */}
          <Link to="/" className="flex flex-col items-center pt-1 no-underline">
            <Home size={24} className={isActiveRoute('/') ? "text-red-800" : "text-gray-900"} />
            <span className={`text-sm pt-1 ${isActiveRoute('/') ? "font-bold text-red-800" : "text-gray-900"}`}>Home</span>
          </Link>
          
          {/* Recipes */}
          <Link to="/recipes" className="flex flex-col items-center pt-1 no-underline">
            <UtensilsCrossed size={24} className={isActiveRoute('/recipes') ? "text-red-800" : "text-gray-900"} />
            <span className={`text-sm pt-1 ${isActiveRoute('/recipes') ? "font-bold text-red-800" : "text-gray-900"}`}>Recipes</span>
          </Link>
          
          {/* Recipe Wheel */}
          <Link to="/recipe-wheel" className="flex flex-col items-center pt-1 no-underline">
            <Shuffle size={24} className={isActiveRoute('/recipe-wheel') ? "text-red-800" : "text-gray-900"} />
            <span className={`text-sm pt-1 ${isActiveRoute('/recipe-wheel') ? "font-bold text-red-800" : "text-gray-900"}`}>Recipe Wheel</span>
          </Link>
          
          {/* About Us */}
          <Link to="/about" className="flex flex-col items-center pt-1 no-underline">
            <Info size={24} className={isActiveRoute('/about') ? "text-red-800" : "text-gray-900"} />
            <span className={`text-sm pt-1 ${isActiveRoute('/about') ? "font-bold text-red-800" : "text-gray-900"}`}>About Us</span>
          </Link>
          
          {/* Add Recipe */}
          <Link to="/add-recipe" className="flex flex-col items-center pt-1 no-underline">
            <FilePlus size={24} className={isActiveRoute('/add-recipe') ? "text-red-800" : "text-gray-900"} />
            <span className={`text-sm pt-1 ${isActiveRoute('/add-recipe') ? "font-bold text-red-800" : "text-gray-900"}`}>Add Recipe</span>
          </Link>
          
          {/* Profile/Login */}
          <Link to={isLoggedIn ? "/profile" : "/login"} className="flex flex-col items-center no-underline">
            <div className={`p-2 ${isActiveRoute(isLoggedIn ? '/profile' : '/login') ? "bg-red-700" : "bg-red-800"} rounded-full transition-colors`}>
              {isLoggedIn ? (
                <User size={18} className="text-white" />
              ) : (
                <LogIn size={18} className="text-white" />
              )}
            </div>
            <span className="text-red-800 text-sm">{isLoggedIn ? "Profile" : "Login"}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;