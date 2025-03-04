import React, { useState, useRef } from 'react';
import Header from './Header';
import './HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const handleSpinWheel = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      console.log('Spinning the wheel!');
      
      // Reset animation after it completes
      setTimeout(() => {
        setIsSpinning(false);
      }, 4000); // Match this to animation duration
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', { contactName, contactEmail, contactMessage });
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <div className="homepage-container">
      {/* Header */}
      <Header />
      
      {/* Login/Register Banner */}
      <div className="login-banner">
        Savor Every Bite - Log in to Discover Delicious & Healthy Meals!
      </div>

      {/* Search Section */}
      <section className="search-section">
        <h1 className="search-heading">
          <span className="search-text-red">Search</span>
          <span className="search-text-yellow"> Healthy</span>
          <span className="search-text-black"> Recipes.</span>
        </h1>
        
        <div className="search-bar-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                  stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      </section>

     {/* Spin The Wheel Section */}
<section className="wheel-section">
  <button onClick={handleSpinWheel} className="spin-button" disabled={isSpinning}>
    Spin <span>The</span> wheel
  </button>
  
  <div className="wheel-container">
    <div className="wheel-outer-ring">
      <div className="wheel-title">Vitamin Wheel</div>
      <img 
        ref={wheelRef}
        src="/vitamin-wheel1.jpg" 
        alt="Vitamin Wheel" 
        className={`vitamin-wheel ${isSpinning ? 'spin-animation' : ''}`}
      />
    </div>
  </div>
</section>
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      {/* Popular Categories */}
      <section className="categories-section">
        <h2 className="categories-heading">Popular Categories:</h2>
        
        {/* Category Buttons */}
        <div className="category-buttons">
          <button className="category-button">Main Dishes <span>🍝</span></button>
          <button className="category-button">Desserts <span>🍰</span></button>
          <button className="category-button">Appetizers <span>🍲</span></button>
          <button className="category-button">Bakery <span>🥖</span></button>
        </div>
        
        <div className="category-grid">
          {/* Main Dishes */}
          <div className="category-item">
            <img 
              src="/api/placeholder/300/200" 
              // alt="Chicken Curry" 
              className="category-image"
            />
            <div className="recipe-info">
              <h3 className="recipe-title">Chicken Curry</h3>
              <div className="cuisine-tag">Cuisine: Indian</div>
            </div>
          </div>
          
          {/* Desserts */}
          <div className="category-item">
            <img 
              src="/api/placeholder/300/200" 
              // alt="Tiramisu" 
              className="category-image"
            />
            <div className="recipe-info">
              <h3 className="recipe-title">Tiramisu</h3>
              <div className="cuisine-tag">Cuisine: Italian</div>
            </div>
          </div>
          
          {/* Appetizers */}
          <div className="category-item">
            <img 
              src="/api/placeholder/300/200" 
              // alt="Kung Pao Chicken" 
              className="category-image"
            />
            <div className="recipe-info">
              <h3 className="recipe-title">Kung Pao Chicken</h3>
              <div className="cuisine-tag">Cuisine: Chinese</div>
            </div>
          </div>
          
          {/* Bakery */}
          <div className="category-item">
            <img 
              src="/api/placeholder/300/200" 
              // alt="Croissant" 
              className="category-image"
            />
            <div className="recipe-info">
              <h3 className="recipe-title">Croissant</h3>
              <div className="cuisine-tag">Cuisine: Spanish</div>
            </div>
          </div>
        </div>
      </section>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-form-container">
          <h2 className="contact-heading">Contact Us</h2>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input 
              type="text" 
              placeholder="Name" 
              className="contact-input"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="example@email.com" 
              className="contact-input"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
            <textarea 
              placeholder="Message" 
              rows="3" 
              className="contact-textarea"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="contact-submit-button">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-info">
          <div className="footer-logo">
            <span className="logo-ye">Ye-</span>
            <span className="logo-bitir">Bitir</span>
          </div>
          <p className="footer-description">
            Your healthy recipe platform - Explore our offerings from our chefs, step by step cooking guides, meal planning, nutritional and recommendation tips.
          </p>
        </div>
        
        <div className="footer-contact">
          <h3 className="footer-heading">Quick Contact</h3>
          <p className="footer-contact-item">
            <span className="contact-icon">✉️</span>
            yebitir@gmail.com
          </p>
          <p className="footer-contact-item">
            <span className="contact-icon">📞</span>
            +90 5079296861.
          </p>
        </div>
        
        <div className="footer-legal">
          <p>© 2025 Ye Bitir. Created by Your Team Here.</p>
          <p>All Rights Reserved</p>
          <p className="footer-links">
            <a href="#">Terms of Service</a> | 
            <a href="#">Privacy Policy</a> | 
            <a href="#">Cookie Preferences</a>
          </p>
          <p>[Do Not Sell or Share My Personal Information]</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
