import React from 'react';
import { Link } from 'react-router-dom';
import { Home, UtensilsCrossed, Users, BarChart2, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Chart titles
  const chartTitles = {
    userGrowth: "User Growth (2025)",
    recipeCategories: "Recipe Categories"
  };

  // Mock data for recent recipes
  const recentRecipes = [
    { id: 1, title: 'Homemade Turkish Lahmacun', author: 'Emirhan', status: 'published', date: '2025-03-04', views: 142 },
    { id: 2, title: 'Authentic Adana Kebab', author: 'Hayrunnisa', status: 'published', date: '2025-03-03', views: 89 },
    { id: 3, title: 'Classic Turkish Baklava', author: 'Rumeysa', status: 'pending', date: '2025-03-05', views: 0 },
    { id: 4, title: 'Spicy Chicken Köfte', author: 'Zaid', status: 'published', date: '2025-03-02', views: 215 },
    { id: 5, title: 'Quick Breakfast Menemen', author: 'CookingMaster', status: 'pending', date: '2025-03-05', views: 0 }
  ];

  // Mock data for chart - User signups over time
  const userSignupData = [
    { name: 'Jan', users: 65 },
    { name: 'Feb', users: 78 },
    { name: 'Mar', users: 110 },
    { name: 'Apr', users: 95 },
    { name: 'May', users: 130 },
    { name: 'Jun', users: 142 },
    { name: 'Jul', users: 168 },
    { name: 'Aug', users: 184 },
    { name: 'Sep', users: 223 },
    { name: 'Oct', users: 205 },
    { name: 'Nov', users: 240 },
    { name: 'Dec', users: 253 }
  ];

  // Mock data for recipe categories
  const recipeCategories = [
    { name: 'Main Course', count: 86 },
    { name: 'Desserts', count: 54 },
    { name: 'Appetizers', count: 42 },
    { name: 'Soups', count: 28 },
    { name: 'Salads', count: 38 }
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
            <Link to="/admin" className="flex items-center px-6 py-4 text-white" style={{ backgroundColor: themeColors.primary }}>
              <Home className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/recipes" className="flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700">
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
              <h1 className="text-2xl font-bold" style={{ color: themeColors.text.primary }}>Dashboard</h1>
              <p style={{ color: themeColors.text.secondary }}>Welcome to Ye-Bitir Admin Panel</p>
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
              
              <button
                className="flex items-center px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: themeColors.secondary }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

                      {/* Stats Cards - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">Total Recipes</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>248</p>
            </div>
            
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">Total Users</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>1893</p>
            </div>
            
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">Total Views</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>15784</p>
            </div>
            
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">Total Likes</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>4236</p>
            </div>
          </div>

          {/* Second row of stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">Pending Approvals</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>18</p>
            </div>
            
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">Active Users</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>642</p>
            </div>
            
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.secondary }} className="text-sm font-medium mb-2">New Users Today</h3>
              <p className="text-3xl font-bold" style={{ color: themeColors.text.primary }}>24</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* User Growth Chart */}
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.primary }} className="font-medium mb-4">{chartTitles.userGrowth}</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userSignupData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#444' : '#ddd'} />
                    <XAxis dataKey="name" stroke={isDark ? '#ccc' : '#666'} />
                    <YAxis stroke={isDark ? '#ccc' : '#666'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#3a4556' : '#fff',
                        color: isDark ? '#fff' : '#000',
                        border: `1px solid ${isDark ? '#555' : '#ddd'}`
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke={themeColors.primary}
                      strokeWidth={2}
                      dot={{ fill: themeColors.primary }}
                      activeDot={{ r: 8, fill: themeColors.primary }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recipe Categories Chart */}
            <div className="rounded-lg shadow p-6" style={{ 
              backgroundColor: themeColors.card,
            }}>
              <h3 style={{ color: themeColors.text.primary }} className="font-medium mb-4">{chartTitles.recipeCategories}</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={recipeCategories}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#444' : '#ddd'} />
                    <XAxis dataKey="name" stroke={isDark ? '#ccc' : '#666'} />
                    <YAxis stroke={isDark ? '#ccc' : '#666'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#3a4556' : '#fff',
                        color: isDark ? '#fff' : '#000',
                        border: `1px solid ${isDark ? '#555' : '#ddd'}`
                      }}
                    />
                    <Bar dataKey="count" fill={themeColors.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Recipes Table */}
          <div className="rounded-lg shadow mb-6" style={{ 
            backgroundColor: themeColors.card,
          }}>
            <div className="px-6 py-4 border-b flex justify-between items-center" style={{ 
              borderColor: isDark ? '#3a4556' : '#e2e8f0' 
            }}>
              <h2 style={{ color: themeColors.text.primary }} className="font-semibold">Recent Recipes</h2>
              <Link 
                to="/admin/recipes" 
                className="text-sm hover:underline"
                style={{ color: themeColors.primary }}
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left" style={{ 
                    backgroundColor: themeColors.table.header,
                  }}>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Title</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Author</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Status</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Date</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: themeColors.text.secondary }}>Views</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ 
                  borderColor: isDark ? '#3a4556' : '#e2e8f0' 
                }}>
                  {recentRecipes.map(recipe => (
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
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          recipe.status === 'published' 
                            ? isDark ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
                            : isDark ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {recipe.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: themeColors.text.primary }}>{recipe.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: themeColors.text.primary }}>{recipe.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;