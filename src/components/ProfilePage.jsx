import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock data - Replace with actual API calls in production
const mockMyRecipes = [
  { 
    id: 1, 
    title: 'Homemade Pizza with Fresh Basil and Mozzarella', 
    image: 'https://media.istockphoto.com/id/1349560847/photo/slice-of-hot-pizza-large-cheese-lunch-or-dinner-traditional-italian-food-takeaway-with-melted.jpg?s=612x612&w=0&k=20&c=tUiljxr0yvJ-qsagIwcaNgQD226n6ZYgQIrk1dGk-Zo=', 
    timeInMins: 45, 
    rating: 4.7, 
    servings: 4 
  },
  { 
    id: 2, 
    title: 'Triple Chocolate Cake with Ganache', 
    image: 'https://media.istockphoto.com/id/1311220995/photo/chocolate-birthday-cake-with-chocolate-frosting-and-sprinkles.jpg?s=612x612&w=0&k=20&c=b0qHFczx3TjUG0iKLUB9TN0VVKpFHXQs2tBfW7UO3XI=', 
    timeInMins: 60, 
    rating: 4.9, 
    servings: 8 
  },
  { 
    id: 3, 
    title: 'Beef Stir Fry with Seasonal Vegetables', 
    image: 'https://media.istockphoto.com/id/1309136478/photo/beef-stir-fry-with-green-beans-and-tomatoes.jpg?s=612x612&w=0&k=20&c=WmK_2s3HG2YwbfAzMu-U2GjSuYW_ZuTy9N77wZ_PJHA=', 
    timeInMins: 30, 
    rating: 4.5, 
    servings: 2 
  },
];

const mockSavedRecipes = [
  { 
    id: 4, 
    title: 'Creamy Pasta Carbonara with Pancetta', 
    image: 'https://media.istockphoto.com/id/1358851353/photo/spaghetti-alla-carbonara-italian-pasta-dish-with-crispy-bacon-and-parmesan-in-a-black-bowl.jpg?s=612x612&w=0&k=20&c=NxQEpVLhVIhTRtTbfz3SBvZBfcKGh_PxH5-BaUX9dXg=', 
    timeInMins: 25, 
    rating: 4.8, 
    servings: 2, 
    author: 'ChefMaria' 
  },
  { 
    id: 5, 
    title: 'Authentic Chicken Curry with Basmati Rice', 
    image: 'https://media.istockphoto.com/id/1345298959/photo/butter-chicken-or-murgh-makhani.jpg?s=612x612&w=0&k=20&c=_tOaCMQiL2s-8I_1JTohLcv4Jn-VYyPWz2Q6v2B8xP0=', 
    timeInMins: 50, 
    rating: 4.6, 
    servings: 4, 
    author: 'SpiceKing' 
  },
  { 
    id: 6, 
    title: 'Mixed Berry Smoothie Bowl with Granola', 
    image: 'https://media.istockphoto.com/id/1411248193/photo/healthy-yogurt-smoothie-bowl-with-berry-fruits.jpg?s=612x612&w=0&k=20&c=7Kew-NeHYIVz1cC7j-3BN0HYiGS-UCQFebaQ-RA2yzk=', 
    timeInMins: 10, 
    rating: 4.3, 
    servings: 1, 
    author: 'HealthyEats' 
  },
];

const ProfilePage = ({ initialTab = 'myRecipes' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [userData, setUserData] = useState({
    username: 'CookingEnthusiast',
    profileImage: '/images/profile.jpg',
    bio: 'Food lover and home cook experimenting with flavors from around the world.',
    recipesCount: 12,
    savedCount: 34,
  });

  // In a real app, this would fetch user data and recipes from an API
  useEffect(() => {
    // fetchUserData();
    // fetchUserRecipes();
    // fetchSavedRecipes();
  }, []);

  const RecipeCard = ({ recipe, isSaved }) => (
    <Link to={`/recipe/${recipe.id}`} className="block w-full">
      <div className="w-full bg-[#e2ece0] rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
        <div className="h-48 overflow-hidden">
          <img 
            src={recipe.image || "/api/placeholder/320/240"} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          {/* Recipe Title with fixed height for 2 lines */}
          <h3 className="text-lg font-semibold text-[#34495e] mb-2 h-14 line-clamp-2 overflow-hidden">{recipe.title}</h3>
          
          {isSaved && <p className="text-sm text-[#34495e] mb-2">by {recipe.author}</p>}
          
          {/* Recipe Metadata */}
          <div className="flex flex-col space-y-1 text-sm text-white">
            {/* Info grid with consistent padding */}
            <div className="grid grid-cols-3 gap-2">
              {/* Cooking Time */}
              <div className="flex flex-col items-center justify-center bg-[#34495e] p-1 pb-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{recipe.timeInMins} mins</span>
              </div>
              
              {/* Rating */}
              <div className="flex flex-col items-center justify-center bg-[#34495e] p-1 pb-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-white-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{recipe.rating}</span>
              </div>
              
              {/* Servings */}
              <div className="flex flex-col items-center justify-center bg-[#34495e] p-1 pb-2 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 199.603 199.603"
                  fill="currentColor"
                  className="w-5 h-5 mb-1 text-white-400"
                >
                  <path d="M187.251,173.172c-4.141,0-7.509-3.369-7.509-7.509V32.074c0-1.952,1.569-5.644,7.509-5.644 c9.424,0,12.352,33.462,12.352,45.651c0,18.908-4.182,36.269-4.843,38.893v54.688C194.76,169.803,191.392,173.172,187.251,173.172z M184.742,113.161v52.502c0,1.383,1.125,2.509,2.509,2.509s2.509-1.125,2.509-2.509v-52.502H184.742z M184.742,108.161h5.548 c1.187-5.159,4.313-20.256,4.313-36.079c0-20.876-4.906-38.858-7.546-40.649c-1.542,0.033-2.218,0.461-2.314,0.771V108.161z M16.632,173.172c-1.87,0-3.67-0.734-4.938-2.014c-1.165-1.177-1.799-2.711-1.783-4.318l0.806-81.785 C4.583,82.688,0.142,76.768,0.001,69.852C-0.001,69.79,0,69.727,0.003,69.664L1.718,31.96c0.063-1.378,1.259-2.421,2.61-2.384 c1.38,0.063,2.447,1.232,2.384,2.611l-1.596,35.09h4.361l0.802-35.26c0.031-1.381,1.208-2.48,2.556-2.443 c1.381,0.032,2.474,1.176,2.442,2.556L14.48,67.278h4.306l-0.799-35.147c-0.031-1.38,1.062-2.524,2.442-2.556 c1.358-0.042,2.525,1.062,2.556,2.443l0.802,35.26h4.361l-1.595-35.09c-0.063-1.379,1.004-2.548,2.384-2.611 c1.367-0.052,2.549,1.005,2.61,2.384l1.714,37.703c0.003,0.063,0.004,0.126,0.002,0.188c-0.141,6.915-4.582,12.836-10.716,15.203 l0.807,81.785c0.016,1.607-0.618,3.141-1.783,4.318C20.302,172.438,18.502,173.172,16.632,173.172z M15.706,86.156l-0.795,80.732 c-0.003,0.337,0.181,0.595,0.336,0.751c0.67,0.677,2.099,0.676,2.771,0c0.155-0.157,0.339-0.415,0.336-0.751l-0.796-80.732H15.706z M5.333,72.278c1.256,5.078,5.878,8.878,11.299,8.878c5.422,0,10.044-3.8,11.299-8.878h-6.587c0,0-0.003,0-0.005,0h-9.414 c-0.001,0-0.001,0-0.002,0c0,0-0.001,0-0.002,0H5.333z M102.781,163.258c-36.692,0-66.544-29.852-66.544-66.544 s29.852-66.544,66.544-66.544c36.693,0,66.545,29.852,66.545,66.544S139.475,163.258,102.781,163.258z M102.781,35.169 c-33.936,0-61.544,27.609-61.544,61.544s27.608,61.544,61.544,61.544s61.545-27.609,61.545-61.544S136.717,35.169,102.781,35.169z M102.781,145.155c-26.711,0-48.441-21.731-48.441-48.441s21.73-48.441,48.441-48.441s48.441,21.731,48.441,48.441 S129.492,145.155,102.781,145.155z M102.781,53.272c-23.954,0-43.441,19.488-43.441,43.441s19.487,43.441,43.441,43.441 s43.441-19.488,43.441-43.441S126.735,53.272,102.781,53.272z"></path>
                </svg>
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl bg-white">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 md:mb-0 md:mr-6 relative group">
            <img 
              src={userData.profileImage || "/api/placeholder/128/128"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-white text-sm font-medium">Change Photo</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2 text-[#34495e]">{userData.username}</h1>
            <p className="text-[#34495e] opacity-70 mb-4">{userData.bio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <div className="text-center">
                <p className="font-semibold text-[#34495e]">{userData.recipesCount}</p>
                <p className="text-sm text-[#34495e] opacity-70">Recipes</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#34495e]">{userData.savedCount}</p>
                <p className="text-sm text-[#34495e] opacity-70">Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'myRecipes' ? 'text-[#c0392b] border-b-2 border-[#c0392b]' : 'text-[#34495e]'}`}
            onClick={() => setActiveTab('myRecipes')}
          >
            My Recipes
          </button>
          <button 
            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'savedRecipes' ? 'text-[#c0392b] border-b-2 border-[#c0392b]' : 'text-[#34495e]'}`}
            onClick={() => setActiveTab('savedRecipes')}
          >
            Saved Recipes
          </button>
          <button 
            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'settings' ? 'text-[#c0392b] border-b-2 border-[#c0392b]' : 'text-[#34495e]'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'myRecipes' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-4 text-[#34495e]">My Recipes</h2>
            <button className="bg-[#c0392b] hover:bg-[#a82315] text-white px-4 py-2 rounded-md focus:outline-none flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Recipe
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMyRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} isSaved={false} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'savedRecipes' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#34495e]">Saved Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSavedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} isSaved={true} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-[#34495e]">Account Settings</h2>
          
          {/* This will be a link to a dedicated settings page in the future */}
          <div className="space-y-6">
            <div className="border-b pb-6 border-gray-200">
              <h3 className="text-lg font-medium mb-4 text-[#34495e]">Profile Information</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-[#34495e] mb-2">Username</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c0392b]"
                    defaultValue={userData.username}
                  />
                </div>
                <div>
                  <label className="block text-[#34495e] mb-2">Bio</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c0392b]"
                    rows="3"
                    defaultValue={userData.bio}
                  />
                </div>
                <div>
                  <label className="block text-[#34495e] mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c0392b]"
                    defaultValue="user@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[#34495e] mb-2">Profile Photo</label>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mr-4">
                      <img 
                        src={userData.profileImage || "/api/placeholder/64/64"} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-gray-200 hover:bg-gray-300 text-[#34495e] px-4 py-2 rounded-md focus:outline-none transition-colors"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>
                <button 
                  type="button"
                  className="bg-[#c0392b] hover:bg-[#a82315] text-white px-4 py-2 rounded-md focus:outline-none transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
            
            <div className="border-b pb-6 border-gray-200">
              <h3 className="text-lg font-medium mb-4 text-[#34495e]">Notification Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#34495e]">Email notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c0392b]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#34495e]">Recipe like notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c0392b]"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 text-[#34495e]">Account Actions</h3>
              <div className="space-y-4">
                <button className="text-[#c0392b] hover:text-[#a82315] flex items-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Change Password
                </button>
                <button className="text-[#c0392b] hover:text-[#a82315] flex items-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;