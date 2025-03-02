import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import RecipePage from './RecipePage';
import SuggestionsSection from './SuggestionsSection';
import RecipeWheel from './RecipeWheel';

// Recipe data that would normally come from an API or database
const dummyRecipes = [
  {
    id: 1,
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
        tags={recipe.tags}
        initialComments={recipe.initialComments}
      />
    </div>
  );
};



// Home page component
const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-800 mb-4">Welcome to Ye-Bitir</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Discover amazing recipes from around the world, share your own creations, and connect with food lovers.
        </p>
      </div>
      
      {/* Featured recipes section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">Featured Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {dummyRecipes.map(recipe => (
            <Link 
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="no-underline"
            >
              <div className="cursor-pointer transition-transform hover:scale-105">
                <RecipeCard
                  title={recipe.title}
                  image={recipe.image}
                  timeInMins={recipe.timeInMins}
                  rating={recipe.rating}
                  servings={recipe.servings}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component with Router
const HomePage = () => {
    return (
      <Router>
        <div className="min-h-screen bg-gray-300 flex flex-col">
          {/* Header - isHomepage is true only when on home page */}
          <Routes>
            <Route path="/" element={<Header isHomepage={true} isLoggedIn={false} />} />
            <Route path="*" element={<Header isHomepage={false} isLoggedIn={false} />} />
          </Routes>
          
          {/* Main content area with padding to account for fixed header */}
          <main className="flex-grow pt-20 pb-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
              <Route path="/search" element={<div className="container mx-auto py-8"><h1 className="text-3xl font-bold text-red-800">Search page</h1></div>} /> {/* Placeholder */}
              <Route path="/recipe-wheel" element={<RecipeWheel />} />
              <Route path="/recipes" element={<div className="container mx-auto py-8"><h1 className="text-3xl font-bold text-red-800">Search page</h1></div>} /> {/* Placeholder */}
              <Route path="/about" element={<div className="container mx-auto py-8"><h1 className="text-3xl font-bold text-red-800">About Us</h1></div>} /> {/* Placeholder */}
              <Route path="/add-recipe" element={<div className="container mx-auto py-8"><h1 className="text-3xl font-bold text-red-800">Add Recipe</h1></div>} /> {/* Placeholder */}
              <Route path="/login" element={<div className="container mx-auto py-8"><h1 className="text-3xl font-bold text-red-800">Login</h1></div>} /> {/* Placeholder */}
              <Route path="/profile" element={<div className="container mx-auto py-8"><h1 className="text-3xl font-bold text-red-800">Profile</h1></div>} /> {/* Placeholder */}
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    );
  };

export default HomePage;