import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface RecipeCardProps {
  recipe: {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{recipe.strMeal}</h3>
        <p className="text-sm text-gray-500">{recipe.strCategory} • {recipe.strArea}</p>

        {/* Button stays at the bottom */}
        <div className="mt-auto pt-4">
          <Button 
            text="View Details" 
            color="#F97316" 
            onClick={() => navigate(`/details/${recipe.idMeal}`)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
