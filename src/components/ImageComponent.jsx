import { useState } from "react";

const ImageComponent = ({ headerImage }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div>
      {/* Conditional Rendering: Full-Screen Image */}
      {isFullScreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setIsFullScreen(false)} // Close when clicked
        >
          <img src={headerImage} alt="Full View" className="max-w-full max-h-full"/>
        </div>
      )}

      {/* Header Image with Button */}
      <div 
        className="relative w-full h-90 bg-cover bg-center"
        style={{ backgroundImage: `url(${headerImage})` }}
      >
        {/* Open Full Image Button */}
        <button 
          className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
          onClick={() => setIsFullScreen(true)}
        >
          View Full Image
        </button>
      </div>
    </div>
  );
};

export default ImageComponent;
