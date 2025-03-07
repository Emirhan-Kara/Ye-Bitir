import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, UtensilsCrossed, Users, BarChart2, Settings, LogOut, Search, Filter, Eye, Edit, Trash2, Check, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const RecipeManagement = () => {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Mock data for recipes
  const [recipes, setRecipes] = useState([
    { 
      id: 1, 
      title: 'Homemade Turkish Lahmacun', 
      author: 'Emirhan', 
      category: 'Main Course',
      status: 'published', 
      date: '2025-03-04', 
      views: 142,
      likes: 37,
      featured: true
    },
    { 
      id: 2, 
      title: 'Authentic Adana Kebab', 
      author: 'Hayrunnisa', 
      category: 'Main Course',
      status: 'published', 
      date: '2025-03-03', 
      views: 89,
      likes: 22,
      featured: false
    },
    { 
      id: 3, 
      title: 'Classic Turkish Baklava', 
      author: 'Rumeysa', 
      category: 'Desserts',
      status: 'pending', 
      date: '2025-03-05', 
      views: 0,
      likes: 0,
      featured: false
    },
    { 
      id: 4, 
      title: 'Spicy Chicken Köfte', 
      author: 'Zaid', 
      category: 'Main Course',
      status: 'published', 
      date: '2025-03-02', 
      views: 215,
      likes: 54,
      featured: true
    },
    { 
      id: 5, 
      title: 'Quick Breakfast Menemen', 
      author: 'CookingMaster', 
      category: 'Breakfast',
      status: 'pending', 
      date: '2025-03-05', 
      views: 0,
      likes: 0,
      featured: false
    },
    { 
      id: 6, 
      title: 'Creamy Mushroom Soup', 
      author: 'ZeynepKaya', 
      category: 'Soups',
      status: 'published', 
      date: '2025-03-05', 
      views: 56,
      likes: 14,
      featured: false
    },
    { 
      id: 7, 
      title: 'Easy Turkish Rice Pudding', 
      author: 'AhmetYilmaz', 
      category: 'Desserts',
      status: 'published', 
      date: '2025-03-01', 
      views: 122,
      likes: 41,
      featured: false
    },
    { 
      id: 8, 
      title: 'Mediterranean Chickpea Salad', 
      author: 'MerveDeniz', 
      category: 'Salads',
      status: 'published', 
      date: '2025-03-04', 
      views: 78,
      likes: 19,
      featured: false
    },
    { 
      id: 9, 
      title: 'Traditional Turkish Coffee', 
      author: 'EmreAksoy', 
      category: 'Beverages',
      status: 'pending', 
      date: '2025-03-06', 
      views: 0,
      likes: 0,
      featured: false
    }
  ]);

  // Categories for filtering
  const categories = [
    'All Categories',
    'Main Course',
    'Desserts',
    'Breakfast',
    'Appetizers',
    'Soups',
    'Salads',
    'Beverages'
  ];

  // Default theme values in case theme is not properly loaded
  const isDark = theme?.name === 'dark';
  
  const themeColors = {
    primary: isDark ? '#e53e3e' : '#e53e3e', // Keep the same red for both themes
    secondary: isDark ? '#2d3748' : '#4a5568',
    background: isDark ? '#1a202c' : '#f7fafc',
    text: {
      primary: isDark ? '#f7fafc' : '#1a202c',
      secondary: isDark ? '#a0aec0' : '#4a5568'
    },
    card: isDark ? '#2d3748' : 'white',
    table: {
      header: isDark ? '#1e2533' : '#f9fafb',
      row: isDark ? '#2d3748' : 'white',
      hover: isDark ? '#3a4556' : '#f7fafc'
    }
  };

  // Filter recipes based on search, status filter, and category filter
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          recipe.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatusFilter = filterStatus === 'all' || recipe.status === filterStatus;
    const matchesCategoryFilter = filterCategory === 'all' || 
                                  recipe.category.toLowerCase() === filterCategory.toLowerCase();
    
    return matchesSearch && matchesStatusFilter && matchesCategoryFilter;
  });

  // Approve a pending recipe
  const approveRecipe = (recipeId) => {
    setRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, status: 'published' } 
          : recipe
      )
    );
  };

  // Reject a pending recipe
  const rejectRecipe = (recipeId) => {
    setRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, status: 'rejected' } 
          : recipe
      )
    );
  };

  // Toggle featured status
  const toggleFeatured = (recipeId) => {
    setRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, featured: !recipe.featured } 
          : recipe
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: themeColors.background }}>
      {/* Left Sidebar Navigation */}
      <div className="flex flex-1">
        <aside className="w-64" style={{ backgroundColor: themeColors.secondary }}>
          <div className="flex items-center justify-center p-4">
            <h2 className="text-2xl font-bold">
              <span className="text-white">Ye</span>
              <span style={{ color: themeColors.primary }}>Bitir</span>
            </h2>
          </div>
          <nav className="mt-6">
            <Link to="/admin" className="flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700">
              <Home className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/recipes" className="flex items-center px-6 py-4 text-white" style={{ backgroundColor: themeColors.primary }}>
              <UtensilsCrossed className="w-5 h-5 mr-3" />
              <span>Recipes Management</span>
            </Link>
            <Link to="/admin/users" className="flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700">
              <Users className="w-5 h-5 mr-3" />
              <span>User Management</span>
            </Link>
            <Link to="/admin/analytics" className="flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700">
              <BarChart2 className="w-5 h-5 mr-3" />
              <span>Analytics</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700">
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8" style={{ backgroundColor: themeColors.background }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: themeColors.text.primary }}>Recipe Management</h1>
              <p style={{ color: themeColors.text.secondary }}>Manage recipes and recipe submissions</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dark/Light Mode text with toggle */}
              <div className="flex items-center">
                <span className="mr-2" style={{ color: themeColors.text.primary }}>
                  {isDark ? 'Dark' : 'Light'} Mode
                </span>
                <div 
                  className="relative inline-block w-12 h-6 rounded-full cursor-pointer"
                  onClick={toggleTheme}
                  style={{ 
                    backgroundColor: isDark ? themeColors.secondary : '#e2e8f0'
                  }}
                >
                  <div 
                    className={`
                      absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300
                      ${isDark ? 'translate-x-7' : 'translate-x-0'}
                    `}
                    style={{ top: '2px', left: '2px' }}
                  >
                    {isDark ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-yellow-500 m-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-yellow-500 m-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              
              <Link
                to="/login"
                className="flex items-center px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: themeColors.secondary }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Link>
            </div>
          </div>

          {/* Recipe Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">Total Recipes</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>248</p>
            </div>
            
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">Published</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>230</p>
            </div>
            
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">Pending</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>18</p>
            </div>
            
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">Featured</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>12</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5" style={{ color: themeColors.text.secondary }} />
              </div>
              <input
                type="text"
                placeholder="Search recipes by title or author..."
                className="pl-10 pr-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ 
                  backgroundColor: isDark ? '#3a4556' : 'white',
                  color: themeColors.text.primary,
                  borderColor: isDark ? '#4a5568' : '#e2e8f0',
                  focusRing: themeColors.primary
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5" style={{ color: themeColors.text.secondary }} />
              </div>
              <select
                className="pl-10 pr-8 py-2 rounded-md w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-opacity-50 appearance-none"
                style={{ 
                  backgroundColor: isDark ? '#3a4556' : 'white',
                  color: themeColors.text.primary,
                  borderColor: isDark ? '#4a5568' : '#e2e8f0',
                  focusRing: themeColors.primary
                }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="h-4 w-4" style={{ color: themeColors.text.secondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="relative w-full md:w-auto">
              <select
                className="pl-4 pr-8 py-2 rounded-md w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-opacity-50 appearance-none"
                style={{ 
                  backgroundColor: isDark ? '#3a4556' : 'white',
                  color: themeColors.text.primary,
                  borderColor: isDark ? '#4a5568' : '#e2e8f0',
                  focusRing: themeColors.primary
                }}
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value.toLowerCase())}
              >
                {categories.map((category, index) => (
                  <option key={index} value={index === 0 ? 'all' : category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="h-4 w-4" style={{ color: themeColors.text.secondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Recipes Table */}
          <div className="rounded-lg shadow mb-8" style={{ 
            backgroundColor: themeColors.card,
          }}>
            <div className="px-6 py-4 border-b" style={{ 
              borderColor: isDark ? '#3a4556' : '#e2e8f0' 
            }}>
              <h2 style={{ color: themeColors.text.primary }} className="font-semibold">Recipes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left" style={{ 
                    backgroundColor: themeColors.table.header,
                  }}>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Title</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Author</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Category</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Status</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Date</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Views</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Likes</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Featured</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ 
                  borderColor: isDark ? '#3a4556' : '#e2e8f0' 
                }}>
                  {filteredRecipes.map(recipe => (
                    <tr 
                      key={recipe.id} 
                      style={{ backgroundColor: themeColors.table.row }}
                      className="hover:bg-opacity-80"
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = themeColors.table.hover}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = themeColors.table.row}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium" style={{ color: themeColors.text.primary }}>{recipe.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: themeColors.text.primary }}>{recipe.author}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: themeColors.text.primary }}>{recipe.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          recipe.status === 'published' 
                            ? isDark ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
                            : recipe.status === 'pending'
                              ? isDark ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800'
                              : isDark ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
                        }`}>
                          {recipe.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: themeColors.text.primary }}>{recipe.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: themeColors.text.primary }}>{recipe.views}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: themeColors.text.primary }}>{recipe.likes}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleFeatured(recipe.id)}
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            recipe.featured
                              ? isDark ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800'
                              : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {recipe.featured ? 'Featured' : 'Not Featured'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button 
                            className="p-1 rounded hover:bg-opacity-80"
                            style={{ backgroundColor: isDark ? '#3a4556' : '#e2e8f0' }}
                            title="View Recipe"
                          >
                            <Eye className="h-4 w-4" style={{ color: themeColors.text.primary }} />
                          </button>
                          <button 
                            className="p-1 rounded hover:bg-opacity-80"
                            style={{ backgroundColor: isDark ? '#3a4556' : '#e2e8f0' }}
                            title="Edit Recipe"
                          >
                            <Edit className="h-4 w-4" style={{ color: themeColors.text.primary }} />
                          </button>
                          {recipe.status === 'pending' && (
                            <>
                              <button 
                                className="p-1 rounded hover:bg-opacity-80"
                                style={{ backgroundColor: isDark ? '#285e28' : '#d1ffd1' }}
                                title="Approve Recipe"
                                onClick={() => approveRecipe(recipe.id)}
                              >
                                <Check className="h-4 w-4" style={{ color: isDark ? '#4ade4a' : '#22c55e' }} />
                              </button>
                              <button 
                                className="p-1 rounded hover:bg-opacity-80"
                                style={{ backgroundColor: isDark ? '#5e2828' : '#ffd1d1' }}
                                title="Reject Recipe"
                                onClick={() => rejectRecipe(recipe.id)}
                              >
                                <X className="h-4 w-4" style={{ color: isDark ? '#de4a4a' : '#ef4444' }} />
                              </button>
                            </>
                          )}
                          <button 
                            className="p-1 rounded hover:bg-opacity-80"
                            style={{ backgroundColor: isDark ? '#3a4556' : '#e2e8f0' }}
                            title="Delete Recipe"
                          >
                            <Trash2 className="h-4 w-4" style={{ color: themeColors.text.primary }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Recipes Section */}
          <div className="rounded-lg shadow mb-6" style={{ 
            backgroundColor: themeColors.card,
          }}>
            <div className="px-6 py-4 border-b" style={{ 
              borderColor: isDark ? '#3a4556' : '#e2e8f0' 
            }}>
              <h2 style={{ color: themeColors.text.primary }} className="font-semibold">Pending Approval</h2>
            </div>
            <div className="p-6">
              {recipes.filter(recipe => recipe.status === 'pending').length === 0 ? (
                <p style={{ color: themeColors.text.secondary }} className="text-center py-4">No recipes waiting for approval</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recipes
                    .filter(recipe => recipe.status === 'pending')
                    .map(recipe => (
                      <div 
                        key={recipe.id} 
                        className="border rounded-lg p-4"
                        style={{ 
                          backgroundColor: isDark ? '#3a4556' : 'white',
                          borderColor: isDark ? '#4a5568' : '#e2e8f0'
                        }}
                      >
                        <h3 className="font-medium mb-2" style={{ color: themeColors.text.primary }}>{recipe.title}</h3>
                        <div className="mb-2">
                          <span className="text-sm" style={{ color: themeColors.text.secondary }}>By </span>
                          <span className="text-sm font-medium" style={{ color: themeColors.text.primary }}>{recipe.author}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm" style={{ color: themeColors.text.secondary }}>
                            Category: <span style={{ color: themeColors.text.primary }}>{recipe.category}</span>
                          </span>
                          <span className="text-sm" style={{ color: themeColors.text.secondary }}>
                            {recipe.date}
                          </span>
                        </div>
                        <div className="flex justify-between mt-4">
                          <button
                            className="px-3 py-1 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                            onClick={() => approveRecipe(recipe.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="px-3 py-1 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            onClick={() => rejectRecipe(recipe.id)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecipeManagement;