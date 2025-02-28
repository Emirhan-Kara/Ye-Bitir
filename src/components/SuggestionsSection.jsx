import React, { useRef, useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const SuggestionsSection = () => {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cardWidth, setCardWidth] = useState(300); // Default estimate
  
  // Dummy data for recipe suggestions
  const dummySuggestions = [
    {
      title: "Spicy Chicken Salad",
      image: "/api/placeholder/320/200",
      timeInMins: 25,
      rating: 4.6,
      servings: 3
    },
    {
      title: "Avocado Toast with Butter and Honey Ketchup",
      image: "/api/placeholder/320/200",
      timeInMins: 10,
      rating: 4.9,
      servings: 1
    },
    {
      title: "Mediterranean Pasta",
      image: "/api/placeholder/320/200",
      timeInMins: 35,
      rating: 4.7,
      servings: 4
    },
    {
      title: "Berry Smoothie Bowl",
      image: "/api/placeholder/320/200",
      timeInMins: 15,
      rating: 4.8,
      servings: 2
    },
    {
      title: "Vegetable Stir Fry",
      image: "/api/placeholder/320/200",
      timeInMins: 30,
      rating: 4.5,
      servings: 2
    },
    {
      title: "Mushroom Risotto",
      image: "/api/placeholder/320/200",
      timeInMins: 40,
      rating: 4.7,
      servings: 4
    }
  ];
  
  // Calculate visible cards and track scroll position
  useEffect(() => {
    if (scrollContainerRef.current) {
      const updateScrollInfo = () => {
        // Get card width including margin
        const cards = scrollContainerRef.current.querySelectorAll('.card-wrapper');
        if (cards.length > 0) {
          const firstCardRect = cards[0].getBoundingClientRect();
          setCardWidth(firstCardRect.width + 16); // width + margin
        }
        
        setMaxScroll(scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth);
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      };
      
      updateScrollInfo();
      
      // Add scroll event listener
      const handleScroll = () => {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      };
      
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', updateScrollInfo);
      
      return () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.removeEventListener('scroll', handleScroll);
        }
        window.removeEventListener('resize', updateScrollInfo);
      };
    }
  }, []);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Calculate the number of whole cards that fit
      const visibleWidth = scrollContainerRef.current.clientWidth;
      const cardsPerView = Math.floor(visibleWidth / cardWidth);
      
      // Scroll by whole cards, making sure not to show partial cards
      const scrollDistance = cardsPerView * cardWidth;
      scrollContainerRef.current.scrollBy({ 
        left: -scrollDistance, 
        behavior: 'smooth' 
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Calculate the number of whole cards that fit
      const visibleWidth = scrollContainerRef.current.clientWidth;
      const cardsPerView = Math.floor(visibleWidth / cardWidth);
      
      // Scroll by whole cards, making sure not to show partial cards
      const scrollDistance = cardsPerView * cardWidth;
      scrollContainerRef.current.scrollBy({ 
        left: scrollDistance, 
        behavior: 'smooth' 
      });
    }
  };
  
  return (
    <div className="w-19/20 mx-auto rounded-[40px] text-white p-6 mt-4 relative">
      <div className="w-3/20 mx-auto bg-red-900 text-yellow-400 p-3 text-2xl font-bold text-center rounded-full">
        Suggestions
      </div>
      
      <div className="relative">
        {/* Left Arrow - Only show if not at the start */}
        {scrollPosition > 0 && (
          <button 
            onClick={scrollLeft}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-yellow-600 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        {/* Suggestions Container - Horizontal Scrolling */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-4 px-12 space-x-4 no-scrollbar"
          style={{ 
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
          `}</style>
          
          {dummySuggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 card-wrapper" 
              style={{ scrollSnapAlign: 'start' }}
            >
              <RecipeCard
                title={suggestion.title}
                image={suggestion.image}
                timeInMins={suggestion.timeInMins}
                rating={suggestion.rating}
                servings={suggestion.servings}
              />
            </div>
          ))}
        </div>
        
        {/* Right Arrow - Only show if not at the end */}
        {scrollPosition < maxScroll && (
          <button 
            onClick={scrollRight}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-yellow-600 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SuggestionsSection;