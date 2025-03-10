import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RecipePage from './RecipePage';
import SuggestionsSection from './SuggestionsSection';
import RecipeWheel from './RecipeWheel';
import Login from './Login';
import SignUp from './SignUp';
import ProfilePage from './ProfilePage';
import UserProfilePage from './UserProfilePage';
import AboutUs from './AboutUs';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import AddRecipePage from './AddRecipePage';
import SearchPage from './SearchPage';
import KVKKCompliance from './KVKKCompliance';
import PrivacyPolicy from './PrivacyPolicy';
import Home from './Home';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import RecipeManagement from './RecipeManagement';
import AdminAnalytics from './AdminAnalytics';
import AdminSettings from './AdminSettings';
import ScrollToTop from './ScrollToTop';


// Recipe data that would normally come from an API or database
const dummyRecipes = [
  {
    id: 1,
    owner: "hcavdar",
    title: "Mediterranean Grilled Chicken Salad",
    image: "/api/placeholder/400/300",
    timeInMins: 35,
    rating: 4.7,
    servings: 2,
    categories: {
      cuisine: "World",
      mealType: "Salads",
      diet: "Low-Carb",
      mainIngredient: "Chicken"
    },
    headerImage: "/api/placeholder/800/400",
    ingredients: [
      "2 boneless, skinless chicken breasts",
      "2 cups mixed greens",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, thinly sliced",
      "1/2 cup kalamata olives, pitted",
      "1/2 cup feta cheese, crumbled",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season chicken breasts with salt, pepper, and oregano. Grill for 6-7 minutes per side until fully cooked.",
      "While the chicken is cooking, combine the mixed greens, cucumber, tomatoes, red onion, and olives in a large bowl.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper to make the dressing.",
      "Slice the grilled chicken into strips and arrange on top of the salad.",
      "Sprinkle with feta cheese and drizzle with the dressing before serving."
    ],
    tags: ["Healthy", "High Protein", "Mediterranean", "Salad", "Gluten-Free"],
    initialComments: [
      {
        id: 101,
        author: "Maria K.",
        authorImage: "/api/placeholder/60/60",
        text: "This salad is perfect for summer! I added some fresh mint leaves and it was delicious.",
        time: "2 days ago",
        likes: 14,
        dislikes: 0
      },
      {
        id: 102,
        author: "John D.",
        authorImage: "/api/placeholder/60/60",
        text: "Great recipe! I substituted the chicken with grilled halloumi for a vegetarian option and it worked perfectly.",
        time: "1 week ago",
        likes: 8,
        dislikes: 1
      }
    ]
  },
  {
    id: 2,
    owner: "emirhan",
    title: "Creamy Mushroom Risotto",
    image: "/api/placeholder/400/300",
    timeInMins: 45,
    rating: 4.8,
    servings: 4,
    categories: {
      cuisine: "Italian",
      mealType: "Main Course",
      diet: "Vegetarian",
      mainIngredient: "Rice"
    },
    headerImage: "/src/assets/image.png",
    ingredients: [
      "1 1/2 cups arborio rice",
      "6 cups vegetable broth, kept warm",
      "8 oz mushrooms, sliced",
      "1 small onion, finely diced",
      "2 cloves garlic, minced",
      "1/2 cup dry white wine",
      "1/2 cup grated Parmesan cheese",
      "2 tbsp butter",
      "2 tbsp olive oil",
      "1 tbsp fresh thyme leaves",
      "Salt and pepper to taste"
    ],
    instructions: [
      "In a large pan, heat 1 tbsp olive oil and sauté the mushrooms until golden brown. Remove and set aside.",
      "In the same pan, heat the remaining olive oil and butter. Add the onion and cook until translucent.",
      "Add the garlic and rice, stirring to coat the rice with the oil and butter mixture for about 2 minutes.",
      "Pour in the wine and stir until it is completely absorbed.",
      "Begin adding the warm broth, one ladle at a time, stirring constantly and allowing each addition to be absorbed before adding more.",
      "After about 20 minutes, when the rice is creamy but still has a slight bite, stir in the cooked mushrooms, Parmesan cheese, and thyme.",
      "Season with salt and pepper to taste. Serve immediately, garnished with additional Parmesan if desired."
    ],
    tags: ["Italian", "Vegetarian", "Comfort Food", "Dinner"],
    initialComments: [
      {
        id: 201,
        author: "Sofia L.",
        authorImage: "/api/placeholder/60/60",
        text: "Fantastic risotto recipe! I used a mix of wild mushrooms and it turned out amazing.",
        time: "3 days ago",
        likes: 12,
        dislikes: 0
      },
      {
        id: 202,
        author: "Michael R.",
        authorImage: "/api/placeholder/60/60",
        text: "This was my first time making risotto and your instructions were perfect! Creamy and delicious.",
        time: "5 days ago",
        likes: 7,
        dislikes: 0
      }
    ]
  },
  {
    id: 3,
    owner: "zaid",
    title: "Spicy Chocolate Brownies",
    image: "/api/placeholder/400/300",
    timeInMins: 40,
    rating: 4.9,
    servings: 12,
    categories: {
      cuisine: "American",
      mealType: "Dessert",
      diet: "Indulgent",
      mainIngredient: "Chocolate"
    },
    headerImage: "/api/placeholder/800/400",
    ingredients: [
      "8 oz dark chocolate, chopped",
      "1/2 cup unsalted butter",
      "1 cup granulated sugar",
      "2 large eggs",
      "1 tsp vanilla extract",
      "3/4 cup all-purpose flour",
      "1/4 cup unsweetened cocoa powder",
      "1 tsp cinnamon",
      "1/2 tsp cayenne pepper (adjust to taste)",
      "1/4 tsp salt",
      "1/2 cup chocolate chips"
    ],
    instructions: [
      "Preheat the oven to 350°F (175°C) and line an 8-inch square baking pan with parchment paper.",
      "In a heatproof bowl over simmering water, melt the dark chocolate and butter, stirring until smooth.",
      "Remove from heat and whisk in the sugar until well combined.",
      "Add the eggs one at a time, whisking well after each addition. Stir in the vanilla extract.",
      "In a separate bowl, whisk together the flour, cocoa powder, cinnamon, cayenne pepper, and salt.",
      "Fold the dry ingredients into the chocolate mixture until just combined. Then fold in the chocolate chips.",
      "Pour the batter into the prepared pan and spread evenly.",
      "Bake for 25-30 minutes, or until a toothpick inserted in the center comes out with a few moist crumbs.",
      "Allow to cool completely before cutting into squares."
    ],
    tags: ["Dessert", "Spicy", "Chocolate", "Baking"],
    initialComments: [
      {
        id: 301,
        author: "Emma W.",
        authorImage: "/api/placeholder/60/60",
        text: "The combination of chocolate and spice is perfect! Not too hot, just a nice warmth at the end.",
        time: "1 day ago",
        likes: 18,
        dislikes: 1
      },
      {
        id: 302,
        author: "David K.",
        authorImage: "/api/placeholder/60/60",
        text: "Incredible brownies! I added some chopped walnuts for extra texture.",
        time: "4 days ago",
        likes: 9,
        dislikes: 0
      }
    ]
  }
];

// Improved Private Route component that properly handles redirects
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) {
      // Save the current path for redirect after login
      localStorage.setItem('redirectPath', location.pathname);
      // Redirect to login
      navigate('/login');
    }
  }, [isLoggedIn, location.pathname, navigate]);
  
  // Don't render anything while redirecting
  if (!isLoggedIn) {
    return null;
  }
  
  // Render the protected component if user is logged in
  return children;
};

// Recipe detail component that displays a specific recipe
const RecipeDetail = () => {
  const { recipeId } = useParams();
  
  // Find the recipe by ID
  const recipe = dummyRecipes.find(r => r.id === parseInt(recipeId));
  
  if (!recipe) {
    return <div className="text-center py-10">Recipe not found</div>;
  }
  
  return (
    <div>
      {/* Recipe Page */}
      <RecipePage 
        title={recipe.title}
        categories={recipe.categories}
        rating={recipe.rating}
        servings={recipe.servings}
        timeInMins={recipe.timeInMins}
        headerImage={recipe.headerImage}
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
        owner={recipe.owner || "unknown"}
        initialComments={recipe.initialComments}
      />
    </div>
  );
};

// Main App Component with Router
const HomePage = () => {
  return (
    <ThemeProvider> {/* Wrap with ThemeProvider */}
      <AuthProvider> {/* Wrap with AuthProvider */}
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

// Separate component for routes to access hooks
const AppRoutes = () => {
  return (
    <Routes>
      {/* Full-screen Login and SignUp routes without Header/Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={
        <ThemeProvider>
          <AdminDashboard />
        </ThemeProvider>
      } />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/recipes" element={<RecipeManagement />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
     
      {/* All other routes with standard layout */}
      <Route path="*" element={<StandardLayout />} />
    </Routes>
  );
};

// Standard layout with Header and Footer
const StandardLayout = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.core.background }}>
      {/* Header - isHomepage is true only when on home page */}
      <Routes>
        <Route path="/" element={<Header isHomepage={true} />} />
        <Route path="*" element={<Header isHomepage={false} />} />
      </Routes>
      
      {/* Main content area with padding to account for fixed header */}
      <main className="flex-grow pt-20 pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recipe-wheel" element={<RecipeWheel />} />
          <Route path="/recipes" element={<SearchPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route path="/add-recipe" element={
            <PrivateRoute>
              <AddRecipePage />
            </PrivateRoute>
          } />
          <Route path="/profile/settings" element={
            <PrivateRoute>
              <ProfilePage initialTab="settings" />
            </PrivateRoute>
          } />
          <Route path="/profile/:username" element={<UserProfilePage />} />
          <Route path="/kvkk" element={<KVKKCompliance />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;