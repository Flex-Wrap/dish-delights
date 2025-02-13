import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeAPI from "../Utils/RecipeAPI";
import Button from "../Components/Button"; // Import the custom button

const DetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        console.log(id);
        const data = await RecipeAPI.getById(id);
        setRecipe(data);
        checkIfFavorite(data.idMeal);
      }
    };
    fetchRecipe();
  }, [id]);

  const checkIfFavorite = (mealId: string) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(mealId));
  };

  const handleFavoriteToggle = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      favorites = favorites.filter((fav: string) => fav !== recipe.idMeal);
    } else {
      favorites.push(recipe.idMeal);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (!recipe) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="md:p-6 max-w-5xl mx-auto">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Side (Image + Ingredients) */}
        <div className="md:col-span-1">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full md:rounded-lg shadow-md"
          />
          <h2 className="text-xl font-semibold mt-6">Ingredients:</h2>
          <ul className="list-disc list-inside mt-2 space-y-1 md:text-start p-4">
            {Array.from({ length: 20 }).map((_, i) => {
              const ingredient = recipe[`strIngredient${i + 1}`];
              const measure = recipe[`strMeasure${i + 1}`];
              return ingredient ? <li key={i}><b>{measure}</b> {ingredient}</li> : null;
            })}
          </ul>
        </div>

        {/* Right Side (Name + Instructions + Favorite Button) */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">{recipe.strMeal}</h2>
          <p className="text-gray-200 leading-relaxed text-start p-4">{recipe.strInstructions}</p>

          {/* Add to Favorites Button (Using Custom Button Component) */}
          <Button 
            text={isFavorite ? "Remove from Favorites 💙" : "Add to Favorites ❤️"} 
            color={isFavorite ? "#DC2626" : "#1E40AF"} 
            onClick={handleFavoriteToggle} 
            className="mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
