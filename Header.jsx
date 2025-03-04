import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-ye">Ye-</span>
        <span className="logo-bitir">Bitir</span>
      </div>
      <nav className="main-nav">
        {/* <a href="#" className="nav-item active">Home</a>
        <a href="#" className="nav-item">Recipes</a>
        <a href="#" className="nav-item">Add</a>
        <a href="#" className="nav-item">Profile</a>
        <a href="#" className="nav-item">About us</a> */}
         <a href="#" className="nav-item active">🏠 Home</a>
  <a href="#" className="nav-item">🍳 Recipes</a>
  <a href="#" className="nav-item">➕ Add</a>
  <a href="#" className="nav-item">👤 Profile</a>
 <a href="#" className="nav-item">About us</a>
      </nav>
    </header>
  );
};

export default Header;
 //<a href="#" className="nav-item active">🏠 Home</a>
// <a href="#" className="nav-item">🍳 Recipes</a>
// <a href="#" className="nav-item">➕ Add</a>
// <a href="#" className="nav-item">👤 Profile</a>
// <a href="#" className="nav-item">ℹ️ About us</a>
