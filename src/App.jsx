import RecipeTitle from "./components/RecipePage"

function App() {
  return (
    <>
       <RecipeTitle 
         title="Cucumber Lemon Pepper Mustard"
         breadcrumbs={["All recipes", "Salads", "Fennel Orange Salad"]}
         rating={2.8}
         servings={2}
         timeInMins={30}
         headerImage="https://media.istockphoto.com/id/1469228227/photo/fresh-salad-of-lentils-spinach-and-almonds.jpg?s=612x612&w=0&k=20&c=BALCedb7wuJHe3uQ5uokTnsqgZ97L3WNHNaN71zT1K8="
         ingredients={[
           "500g chicken",
           "2 red pepper",
           "2 green pepper",
           "30 ml olive oil",
           "1 cup of milk",
           "200g yogurt"
         ]}
         instructions={[
           "Ocagin altini yakiyoruz, tencereyi ocağa ekliyoruz.",
           "Ocagin altini yakiyoruz, tencereyi ocağa ekliyoruz.",
           "Ocagin altini yakiyoruz, tencereyi ocağa ekliyoruz.",
           "Ocagin altini yakiyoruz, tencereyi ocağa ekliyoruz."
         ]}
         tags={["Salad", "Vegan", "Breakfast"]}
         initialComments={[
           {
             id: 1,
             author: "Emirhan Kara",
             authorImage: "/images/avatar1.jpg",
             text: "I really enjoyed the food, it tasted quite good. I would definitely recommend this recipe!",
             time: "2 hours ago",
             likes: 3,
             dislikes: 5
           },
           {
             id: 2,
             author: "Hayrunnisa Çavdar",
             authorImage: "/images/avatar2.jpg",
             text: "IT IS AWFULLL !!!!",
             time: "2 days ago",
             likes: 13,
             dislikes: 2
           }
         ]}
       />
    </>
  )
}

export default App
