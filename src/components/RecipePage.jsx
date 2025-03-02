import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent';
import CommentsSection from './CommentsSection';
import SuggestionsSection from './SuggestionsSection';

// RecipePage component
const RecipePage = ({ 
  title, 
  categories,
  rating, 
  servings, 
  timeInMins,
  headerImage,
  ingredients,
  instructions,
  tags,
  initialComments
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();
  
  // Calculate stars based on rating
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 < 0.8;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
  
  // Generate star elements for the rating
  const renderStars = () => {
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg 
          key={`full-${i}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-5 h-5"
        >
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg 
          key="half" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="w-5 h-5"
        >
          <defs>
            <linearGradient id="halfStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#halfStarGradient)" 
            stroke="currentColor"
            strokeWidth="1"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          />
        </svg>
      );
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg 
          key={`empty-${i}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          strokeWidth="1"
          className="w-5 h-5"
        >
          <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
        </svg>
      );
    }
    
    return stars;
  };
  
  // Category button component
  const CategoryButton = ({ label, value }) => {
    return (
      <button 
        onClick={() => navigate(`/search?category=${label.toLowerCase()}&value=${value.toLowerCase()}`)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-full mr-2 transition-transform duration-200 hover:scale-105 cursor-pointer"
      >
        <span className="font-semibold">{label}:</span> {value}
      </button>
    );
  };
  
  const scrollToComments = () => {
    document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-300">
      {/* Image */}
      <ImageComponent headerImage={headerImage}></ImageComponent><br />
      
      {/* Categories */}
      <div className="w-19/20 mx-auto flex flex-wrap justify-center rounded-2xl">
        {categories && Object.entries(categories).map(([key, value], index) => (
          <CategoryButton 
            key={key} 
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} 
            value={value} 
          />
        ))}
      </div><br />
      
      {/* Recipe Title */}
      <div className="w-16/20 mx-auto bg-red-900 text-white p-6 text-3xl font-bold text-center rounded-full">
        {title}
      </div>
      
      {/* Recipe Stats */}
      <div className="flex flex-wrap justify-center gap-2 py-3 bg-white-100">
        {/* Rating */}
        <div className="bg-red-900 text-white px-3 py-2 rounded-full flex items-center gap-1">
          <span className="font-bold">{rating}/{totalStars}</span>
          <div className="flex">
            {renderStars()}
          </div>
        </div>
        
        {/* Servings */}
        <div className="bg-red-900 text-white px-3 py-2 rounded-full flex items-center gap-2">
          {/* Custom SVG Icon from SVGRepo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 199.603 199.603"
            fill="currentColor"
            className="w-6 h-6 text-white-400"
          >
            <path d="M187.251,173.172c-4.141,0-7.509-3.369-7.509-7.509V32.074c0-1.952,1.569-5.644,7.509-5.644 c9.424,0,12.352,33.462,12.352,45.651c0,18.908-4.182,36.269-4.843,38.893v54.688C194.76,169.803,191.392,173.172,187.251,173.172z M184.742,113.161v52.502c0,1.383,1.125,2.509,2.509,2.509s2.509-1.125,2.509-2.509v-52.502H184.742z M184.742,108.161h5.548 c1.187-5.159,4.313-20.256,4.313-36.079c0-20.876-4.906-38.858-7.546-40.649c-1.542,0.033-2.218,0.461-2.314,0.771V108.161z M16.632,173.172c-1.87,0-3.67-0.734-4.938-2.014c-1.165-1.177-1.799-2.711-1.783-4.318l0.806-81.785 C4.583,82.688,0.142,76.768,0.001,69.852C-0.001,69.79,0,69.727,0.003,69.664L1.718,31.96c0.063-1.378,1.259-2.421,2.61-2.384 c1.38,0.063,2.447,1.232,2.384,2.611l-1.596,35.09h4.361l0.802-35.26c0.031-1.381,1.208-2.48,2.556-2.443 c1.381,0.032,2.474,1.176,2.442,2.556L14.48,67.278h4.306l-0.799-35.147c-0.031-1.38,1.062-2.524,2.442-2.556 c1.358-0.042,2.525,1.062,2.556,2.443l0.802,35.26h4.361l-1.595-35.09c-0.063-1.379,1.004-2.548,2.384-2.611 c1.367-0.052,2.549,1.005,2.61,2.384l1.714,37.703c0.003,0.063,0.004,0.126,0.002,0.188c-0.141,6.915-4.582,12.836-10.716,15.203 l0.807,81.785c0.016,1.607-0.618,3.141-1.783,4.318C20.302,172.438,18.502,173.172,16.632,173.172z M15.706,86.156l-0.795,80.732 c-0.003,0.337,0.181,0.595,0.336,0.751c0.67,0.677,2.099,0.676,2.771,0c0.155-0.157,0.339-0.415,0.336-0.751l-0.796-80.732H15.706z M5.333,72.278c1.256,5.078,5.878,8.878,11.299,8.878c5.422,0,10.044-3.8,11.299-8.878h-6.587c0,0-0.003,0-0.005,0h-9.414 c-0.001,0-0.001,0-0.002,0c0,0-0.001,0-0.002,0H5.333z M102.781,163.258c-36.692,0-66.544-29.852-66.544-66.544 s29.852-66.544,66.544-66.544c36.693,0,66.545,29.852,66.545,66.544S139.475,163.258,102.781,163.258z M102.781,35.169 c-33.936,0-61.544,27.609-61.544,61.544s27.608,61.544,61.544,61.544s61.545-27.609,61.545-61.544S136.717,35.169,102.781,35.169z M102.781,145.155c-26.711,0-48.441-21.731-48.441-48.441s21.73-48.441,48.441-48.441s48.441,21.731,48.441,48.441 S129.492,145.155,102.781,145.155z M102.781,53.272c-23.954,0-43.441,19.488-43.441,43.441s19.487,43.441,43.441,43.441 s43.441-19.488,43.441-43.441S126.735,53.272,102.781,53.272z"></path>
          </svg>

          {/* Servings Text */}
          <span>{servings} Servings</span>
        </div>

        
        {/* Time */}
        <div className="bg-red-900 text-white px-3 py-2 rounded-full flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{timeInMins} mins</span>
        </div>
        
        {/* Comments */}
        <button 
          onClick={scrollToComments}
          className="bg-red-900 hover:bg-red-700 text-white px-3 py-2 rounded-full flex items-center gap-2 transition duration-200 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Comments</span>
        </button>
        
        {/* Bookmark */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`${isBookmarked ? 'bg-black' : 'bg-red-900'} hover:bg-red-700 text-white p-2 rounded-full flex items-center justify-center transition duration-200 cursor-pointer`}
          aria-label={isBookmarked ? "Remove from favorites" : "Add to favorites"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isBookmarked ? 0 : 2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div><br />
      
      {/* Recipe Content */}
      <div className="w-19/20 mx-auto rounded-[40px] bg-red-900 text-white p-[48px] grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Instructions*/}
        <div className="md:col-span-4">
          <h2 className="text-yellow-400 text-4xl font-bold mb-4">Instructions</h2>
          {instructions.map((step, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Step {index + 1}</h3>
              <div className="w-4/5 border-t border-white mb-2"></div>
              <p>{step}</p>
            </div>
          ))}
        </div>

        {/* Ingredients and Tags */}
        <div className="md:col-span-1">
          <h2 className="text-yellow-400 text-3xl font-bold mb-4">Ingredients</h2>
          <ul className="mb-10 space-y-2">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-baseline">
                <span className="text-yellow-400 mr-2">•</span>
                {ingredient}
              </li>
            ))}
          </ul>

          <h2 className="text-yellow-400 text-3xl font-bold mb-4">Tags</h2>
          <ul className="space-y-2">
            {tags.map((tag, index) => (
              <li key={index} className="flex items-baseline">
                <span className="text-yellow-400 mr-2">•</span>
                {tag}
              </li>
            ))}
          </ul>
        </div>

      </div><br />

      {/* Suggestions Section*/}
      <SuggestionsSection text='Suggestions'/><br />

      {/* Comments Section */}
      <CommentsSection initialComments={initialComments}></CommentsSection><br />
    </div> 
  );
};

export default RecipePage;