import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeAPI from "../Utils/RecipeAPI";
import RecipeCard from "../Components/RecipeCard";
import Button from "../Components/Button";

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (storedFavorites.length > 0) {
      const recipes = await Promise.all(storedFavorites.map((id: string) => RecipeAPI.getById(id)));
      setFavoriteRecipes(recipes.filter(Boolean)); // Remove any null values
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Call to Action Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Your Favorite Recipes</h1>
        <p className="text-gray-300 mt-2">Can't find what you're looking for? Create your own recipe!</p>
        <Button 
          text="Get Started" 
          color="#F59E0B" 
          onClick={() => navigate("/create")} 
          className="mt-4"
        />
      </div>

      {/* Favorite Recipes Grid */}
      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.idMeal} 
              recipe={recipe}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">You have no favorite recipes yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
