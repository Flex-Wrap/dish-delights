import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

const CreateRecipePage = () => {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCreate = () => {
    if (!name || !ingredients || !instructions || !imageUrl) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    // Generate a unique ID for local recipes
    const localId = `local${Date.now()}`;

    const newRecipe = {
      idMeal: localId,
      strMeal: name,
      strCategory: "User Created",
      strArea: "Unknown",
      strMealThumb: imageUrl,
      strInstructions: instructions,
      ingredients: ingredients.split("\n").map((ing) => ing.trim()).filter((ing) => ing),
    };

    // Retrieve existing local recipes or initialize an empty array
    const localRecipes = JSON.parse(localStorage.getItem("localRecipes") || "[]");

    // Add the new recipe to the array
    localRecipes.push(newRecipe);

    // Save the updated array back to localStorage
    localStorage.setItem("localRecipes", JSON.stringify(localRecipes));

    // Save the recipe ID to favorites
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.push(localId);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Show thank you message
    setSubmitted(true);

    // Redirect to favorites after a short delay
    setTimeout(() => navigate("/favorites"), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {!submitted ? (
        <>
          {/* Encouraging Message */}
          <h1 className="text-3xl font-bold text-center mb-4">We’re Excited for Your Contribution!</h1>
          <p className="text-gray-400 text-center mb-6">
            Share your amazing recipe with the world. Fill out the details below and add it to your favorites.
          </p>

          {/* Recipe Form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Recipe Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
            />
            <textarea
              placeholder="Ingredients (One per line)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white h-24"
            />
            <textarea
              placeholder="Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white h-32"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
            />
          </div>

          {/* Create Button */}
          <div className="flex justify-center mt-6">
            <Button text="Create Recipe" onClick={handleCreate} />
          </div>
        </>
      ) : (
        <h2 className="text-2xl font-bold text-center text-green-400">THANK YOU! Redirecting to favorites...</h2>
      )}
    </div>
  );
};

export default CreateRecipePage;
