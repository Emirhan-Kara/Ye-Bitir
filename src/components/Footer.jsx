import React from 'react';
import { Search, Home, UtensilsCrossed, Shuffle, Info, FilePlus, User, LogIn } from 'lucide-react';

const Footer = ({ isHomepage = false, isLoggedIn = false }) => {
  return (
    <footer className="bg-red-900 text-white p-4 pl-8 pr-8">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Column 1: Logo */}
        <div className="col-span-1 flex items-center">
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl" style={{ fontFamily: "'Rubik Doodle Shadow', cursive" }}>
              Ye
            </span>
            <span className="font-bold text-xl" style={{ fontFamily: "'Rubik Glitch', cursive" }}>
              Bitir
            </span>
          </div>
        </div>

        {/* Columns 2-5: Search box (only on non-homepage) */}
        {!isHomepage && (
          <div className="col-span-5 flex items-center pr-16">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search recipes..." 
                className="bg-white text-gray-900 w-full p-2 rounded-lg pl-10"
              />
              <Search className="absolute left-3 top-2.5 text-gray-900" size={16} />
            </div>
          </div>
        )}
        
        {/*<div className = "col-span 1"></div>*/}
        
        {/* Empty space for homepage */}
        {isHomepage && <div className="col-span-5"></div>}

        {/* Columns 7-12: Navigation buttons */}
        <div className="col-span-6 flex justify-between items-center">
          {/* Home - text in red-900 */}
          <div className="flex flex-col items-center pt-1">
            <Home size={24} className="text-yellow-400" />
            <span className="text-yellow-400 text-sm pt-1">Home</span>
          </div>
          
          {/* Recipes */}
          <div className="flex flex-col items-center pt-1">
            <UtensilsCrossed size={24} />
            <span className="text-sm pt-1">Recipes</span>
          </div>
          
          {/* Recipe Wheel */}
          <div className="flex flex-col items-center pt-1">
            <Shuffle size={24} />
            <span className="text-sm pt-1">Recipe Wheel</span>
          </div>
          
          {/* About Us */}
          <div className="flex flex-col items-center pt-1">
            <Info size={24} />
            <span className="text-sm pt-1">About Us</span>
          </div>
          
          {/* Add Recipe - with red circle background */}
          <div className="flex flex-col items-center pt-1">
            <FilePlus size={24} className="text-white" />
            <span className="text-sm pt-1">Add Recipe</span>
          </div>
          
          {/* Profile/Login - with red circle background */}
          <div className="flex flex-col items-center">
            <div className="p-2 bg-yellow-600 rounded-full">
              {isLoggedIn ? (
                <User size={18} className="text-white" />
              ) : (
                <LogIn size={18} className="text-white" />
              )}
            </div>
            <span className="text-yellow-500 text-sm">{isLoggedIn ? "Profile" : "Login"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;