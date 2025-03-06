import React from 'react';

const AnimatedFoodIcons = ({ count = 20 }) => {
  const foodEmojis = ['🍕', '🍲', '🍝', '🍜', '🍗', '🍰', '🥗'];
  
  return (
    <div className="absolute w-full h-full">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
            fontSize: `${1 + Math.random() * 1.5}rem`,
            opacity: 0.3
          }}
        >
          {foodEmojis[Math.floor(Math.random() * foodEmojis.length)]}
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedFoodIcons;