import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Home, UtensilsCrossed, Shuffle, Info, FilePlus, User, LogIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Header = ({ 
  isHomepage = false, 
  isLoggedIn = false, 
  scrollThreshold = 50
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely destructure theme with default
  const { theme = { 
    colors: { 
      headerFooter: '#cfd8dc', 
      primary: '#c0392b',
      secondary: '#34495e',
      text: { primary: '#000', light: '#fff' }
    } 
  }, toggleTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        const isScrollingDown = currentScrollY > lastScrollY;
        
        setIsVisible(!isScrollingDown);
        setLastScrollY(currentScrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollThreshold]);

  const isActiveRoute = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/';
  };
  
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setSearchQuery('');
      navigate(`/recipes`);
    }
  };

  return (
    <header 
      className={`text-white p-4 pl-8 pr-8 w-full fixed top-0 z-50 ${
        isVisible 
          ? 'translate-y-0 shadow-md' 
          : '-translate-y-full'
      } transition-all duration-500 ease-in-out`}
      style={{ 
        backgroundColor: theme.colors.headerFooter,
        color: theme.colors.text.light 
      }}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Column 1: Logo */}
        <div className="col-span-1 flex items-center">
          <Link to="/" className="flex flex-col items-center">
            <span 
              className="font-bold text-xl" 
              style={{ color: theme.colors.text.primary }}
            >
              Ye
            </span>
            <span 
              className="font-bold text-xl" 
              style={{ color: theme.colors.primary }}
            >
              Bitir
            </span>
          </Link>
        </div>

        {/* Theme Toggle */}
        <div className="col-span-1">
          <ThemeToggle />
        </div>

        {/* Rest of the header content */}
        {!isHomepage && (
          <div className="col-span-5 flex items-center pr-16">
            <form onSubmit={handleSearch} className="relative w-full flex">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  placeholder="Search recipes..." 
                  className="w-full p-2 rounded-l-lg pl-10"
                  style={{
                    backgroundColor: theme.colors.input.background,
                    color: theme.colors.text.primary,
                    borderColor: theme.colors.input.border
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Search 
                  className="absolute left-3 top-2.5" 
                  size={16} 
                  color={theme.colors.text.primary} 
                />
              </div>
              <button 
                type="submit" 
                className="px-4 py-2 rounded-r-lg transition-colors cursor-pointer"
                style={{
                  backgroundColor: theme.colors.button.primary,
                  color: theme.colors.button.text,
                }}
                aria-label="Search"
              >
                <Search size={16} color={theme.colors.button.text} />
              </button>
            </form>
          </div>
        )}
        
        {isHomepage && <div className="col-span-5"></div>}

        {/* Navigation Buttons */}
        <div className="col-span-5 flex justify-between items-center">
          {/* Home */}
          <Link to="/" className="flex flex-col items-center pt-1 no-underline">
            <Home 
              size={24} 
              color={isActiveRoute('/') ? theme.colors.primary : theme.colors.text.primary} 
            />
            <span 
              className={`text-sm pt-1 ${
                isActiveRoute('/') 
                  ? `font-bold text-[${theme.colors.primary}]`
                  : `text-[${theme.colors.text.primary}]`
              }`}
            >
              Home
            </span>
          </Link>
          
          {/* Recipes */}
          <Link to="/recipes" className="flex flex-col items-center pt-1 no-underline">
            <UtensilsCrossed 
              size={24} 
              color={isActiveRoute('/recipes') ? theme.colors.primary : theme.colors.text.primary} 
            />
            <span 
              className={`text-sm pt-1 ${
                isActiveRoute('/recipes') 
                  ? `font-bold text-[${theme.colors.primary}]`
                  : `text-[${theme.colors.text.primary}]`
              }`}
            >
              Recipes
            </span>
          </Link>
          
          {/* Recipe Wheel */}
          <Link to="/recipe-wheel" className="flex flex-col items-center pt-1 no-underline">
            <Shuffle 
              size={24} 
              color={isActiveRoute('/recipe-wheel') ? theme.colors.primary : theme.colors.text.primary} 
            />
            <span 
              className={`text-sm pt-1 ${
                isActiveRoute('/recipe-wheel') 
                  ? `font-bold text-[${theme.colors.primary}]`
                  : `text-[${theme.colors.text.primary}]`
              }`}
            >
              Recipe Wheel
            </span>
          </Link>
          
          {/* About Us */}
          <Link to="/about" className="flex flex-col items-center pt-1 no-underline">
            <Info 
              size={24} 
              color={isActiveRoute('/about') ? theme.colors.primary : theme.colors.text.primary} 
            />
            <span 
              className={`text-sm pt-1 ${
                isActiveRoute('/about') 
                  ? `font-bold text-[${theme.colors.primary}]`
                  : `text-[${theme.colors.text.primary}]`
              }`}
            >
              About Us
            </span>
          </Link>
          
          {/* Add Recipe */}
          <Link to="/add-recipe" className="flex flex-col items-center pt-1 no-underline">
            <FilePlus 
              size={24} 
              color={isActiveRoute('/add-recipe') ? theme.colors.primary : theme.colors.text.primary} 
            />
            <span 
              className={`text-sm pt-1 ${
                isActiveRoute('/add-recipe') 
                  ? `font-bold text-[${theme.colors.primary}]`
                  : `text-[${theme.colors.text.primary}]`
              }`}
            >
              Add Recipe
            </span>
          </Link>
          
          {/* Profile/Login */}
          <Link 
            to={isLoggedIn ? "/profile" : "/login"} 
            className="flex flex-col items-center no-underline"
          >
            <div 
              className="p-2 rounded-full transition-colors"
              style={{
                backgroundColor: isActiveRoute(isLoggedIn ? '/profile' : '/login') 
                  ? theme.colors.button.primary 
                  : theme.colors.button.secondary
              }}
            >
              {isLoggedIn ? (
                <User size={18} color={theme.colors.button.text} />
              ) : (
                <LogIn size={18} color={theme.colors.button.text} />
              )}
            </div>
            <span 
              className="text-sm"
              style={{ color: theme.colors.primary }}
            >
              {isLoggedIn ? "Profile" : "Login"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;