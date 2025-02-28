import React, { useState, useEffect, useRef } from 'react';

const CommentsSection = ({ 
  initialComments,
}) => {
  const [commentText, setCommentText] = useState('');
  const [allComments, setAllComments] = useState(initialComments || []);
  const [likedComments, setLikedComments] = useState({});
  const [dislikedComments, setDislikedComments] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: "Current User",
      authorImage: "/api/placeholder/60/60",
      text: commentText,
      time: "just now",
      likes: 0,
      dislikes: 0
    };
    
    setAllComments([newComment, ...allComments]);
    setCommentText('');
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

  const toggleDropdown = (commentId) => {
    setOpenDropdownId(openDropdownId === commentId ? null : commentId);
  };

  const handleDeleteComment = (commentId) => {
    setAllComments(allComments.filter(comment => comment.id !== commentId));
    setOpenDropdownId(null);
  };

  const handleReportComment = (commentId) => {
    // In the future, implement actual reporting functionality
    alert(`Comment ${commentId} has been reported.`);
    setOpenDropdownId(null);
  };
  
  return (
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
              
              <div className="flex mt-2 items-center">
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
                  className={`flex items-center mr-4 ${dislikedComments[comment.id] ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                    <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                  </svg>
                  {comment.dislikes}
                </button>
                
                {/* Three Dots Menu */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown(comment.id)}
                    className="text-gray-300 hover:text-white p-1 rounded-full transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {openDropdownId === comment.id && (
                    <div 
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete Comment
                        </button>
                        <button
                          onClick={() => handleReportComment(comment.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                          </svg>
                          Report Comment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;