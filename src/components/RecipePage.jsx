import React, { useState } from 'react';
import ImageComponent from './ImageComponent';

// RecipePage component
const RecipePage = ({ 
  title, 
  breadcrumbs, 
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
  const [commentText, setCommentText] = useState('');
  const [allComments, setAllComments] = useState(initialComments || []);
  const [likedComments, setLikedComments] = useState({});
  const [dislikedComments, setDislikedComments] = useState({});
  
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: "Test User", // This would come from your auth system
      authorImage: "/api/placeholder/60/60", // This would come from your auth system
      text: commentText,
      time: "just now",
      likes: 0,
      dislikes: 0
    };
    
    setAllComments(prevComments => [newComment, ...prevComments]);
    setCommentText('');
  };
  
  const scrollToComments = () => {
    document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleLike = (commentId) => {
    setAllComments(allComments.map(comment => {
      if (comment.id === commentId) {
        // If already liked, unlike
        if (likedComments[commentId]) {
          return { ...comment, likes: comment.likes - 1 };
        } 
        // If disliked, remove dislike and add like
        else if (dislikedComments[commentId]) {
          return { ...comment, likes: comment.likes + 1, dislikes: comment.dislikes - 1 };
        } 
        // Otherwise just add like
        else {
          return { ...comment, likes: comment.likes + 1 };
        }
      }
      return comment;
    }));
    
    setLikedComments(prev => {
      if (prev[commentId]) {
        const newLiked = { ...prev };
        delete newLiked[commentId];
        return newLiked;
      } else {
        return { ...prev, [commentId]: true };
      }
    });
    
    setDislikedComments(prev => {
      if (prev[commentId]) {
        const newDisliked = { ...prev };
        delete newDisliked[commentId];
        return newDisliked;
      } else {
        return prev;
      }
    });
  };
  
  const handleDislike = (commentId) => {
    setAllComments(allComments.map(comment => {
      if (comment.id === commentId) {
        // If already disliked, undislike
        if (dislikedComments[commentId]) {
          return { ...comment, dislikes: comment.dislikes - 1 };
        } 
        // If liked, remove like and add dislike
        else if (likedComments[commentId]) {
          return { ...comment, dislikes: comment.dislikes + 1, likes: comment.likes - 1 };
        } 
        // Otherwise just add dislike
        else {
          return { ...comment, dislikes: comment.dislikes + 1 };
        }
      }
      return comment;
    }));
    
    setDislikedComments(prev => {
      if (prev[commentId]) {
        const newDisliked = { ...prev };
        delete newDisliked[commentId];
        return newDisliked;
      } else {
        return { ...prev, [commentId]: true };
      }
    });
    
    setLikedComments(prev => {
      if (prev[commentId]) {
        const newLiked = { ...prev };
        delete newLiked[commentId];
        return newLiked;
      } else {
        return prev;
      }
    });
  };
  
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-gray-800 font-medium mr-1">Y'e</div>
          <div className="text-red-700 font-bold">Bitir</div>
        </div>
        <nav className="flex">
          <a href="#" className="px-4 py-1 mx-1 text-red-700 hover:bg-red-50 rounded-full">Home</a>
          <a href="#" className="px-4 py-1 mx-1 font-medium bg-gray-100 rounded-full">Recipes</a>
          <a href="#" className="px-4 py-1 mx-1 text-red-700 hover:bg-red-50 rounded-full">Add</a>
          <a href="#" className="px-4 py-1 mx-1 text-red-700 hover:bg-red-50 rounded-full">Profile</a>
          <a href="#" className="px-4 py-1 mx-1 text-red-700 hover:bg-red-50 rounded-full">About us</a>
        </nav>
      </div>
      
      {/* Image */}
      <ImageComponent headerImage={headerImage}></ImageComponent><br />
      
      {/* Breadcrumbs */}
      <div className="w-12/20 mx-auto bg-red-700 text-yellow-400 p-3 text-center rounded-full">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <a href="#" className="hover:underline">{crumb}</a>
            {index < breadcrumbs.length - 1 && <span className="mx-2">{'>'}</span>}
          </React.Fragment>
        ))}
      </div><br />
      
      {/* Recipe Title */}
      <div className="w-16/20 mx-auto bg-red-700 text-white p-6 text-3xl font-bold text-center rounded-full">
        {title}
      </div>
      
      {/* Recipe Stats */}
      <div className="flex flex-wrap justify-center gap-2 py-3 bg-white-100">
        {/* Rating */}
        <div className="bg-red-700 text-white px-3 py-2 rounded-full flex items-center gap-1">
          <span className="font-bold">{rating}/{totalStars}</span>
          <div className="flex">
            {renderStars()}
          </div>
        </div>
        
        {/* Servings */}
        <div className="bg-red-700 text-white px-3 py-2 rounded-full flex items-center gap-2">
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
        <div className="bg-red-700 text-white px-3 py-2 rounded-full flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{timeInMins} mins</span>
        </div>
        
        {/* Comments */}
        <button 
          onClick={scrollToComments}
          className="bg-red-700 hover:bg-red-600 text-white px-3 py-2 rounded-full flex items-center gap-2 transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Comments</span>
        </button>
        
        {/* Bookmark */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`${isBookmarked ? 'bg-black' : 'bg-red-700'} hover:opacity-80 text-white p-2 rounded-full flex items-center justify-center transition duration-200`}
          aria-label={isBookmarked ? "Remove from favorites" : "Add to favorites"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isBookmarked ? 0 : 2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div><br />
      
      {/* Recipe Content */}
      <div className="w-19/20 mx-auto rounded-[40px] bg-red-700 text-white p-[48px] grid grid-cols-1 md:grid-cols-5 gap-8">
        
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

      
      {/* Comments Section */}
      <div id="comments-section" className="w-19/20 mx-auto rounded-[40px] bg-red-700 text-white p-6 mt-4">
        {/* Add Comment */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <form onSubmit={handleCommentSubmit}>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-red-500 resize-none"
              rows="3"
              placeholder="Add your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button 
                type="submit" 
                className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        
        <div className="border-t border-white-600 mb-6"></div>
        
        {/* Comments List */}
        <h2 className="text-yellow-400 text-3xl font-bold mb-6">Comments</h2>
        
        {allComments.map((comment) => (
          <div key={comment.id} className="mb-6">
            <div className="flex items-start mb-2">
              <img 
                src={comment.authorImage} 
                alt={comment.author} 
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{comment.author}</h3>
                  <span className="text-gray-300 text-sm">{comment.time}</span>
                </div>
                <p className="mt-1">{comment.text}</p>
                
                <div className="flex mt-2">
                  <button 
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center mr-4 ${likedComments[comment.id] ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                      <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                    </svg>
                    {comment.likes}
                  </button>
                  <button 
                    onClick={() => handleDislike(comment.id)}
                    className={`flex items-center ${dislikedComments[comment.id] ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                      <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                    </svg>
                    {comment.dislikes}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> <br />
    </div> 
  );
};

export default RecipePage;