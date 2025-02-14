import { useState, useEffect } from "react";
import CommaList from "../Components/CommaList";
import FilterBar from "../Components/FilterBar";
import Hero from "../Components/Hero";
import RecipeCard from "../Components/RecipeCard";
import foodHero from "../assets/food-hero.jpg";
import RecipeAPI from "../Utils/RecipeAPI";

const categories = [
  "Beef", "Breakfast", "Chicken", "Dessert", "Goat", "Lamb", "Miscellaneous",
  "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian"
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const HomePage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAlphabet, setSelectedAlphabet] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // Prevent unnecessary API calls before filters load

  // Load filters from localStorage when the component mounts
  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("selectedCategories") || "[]");
    const savedAlphabet = JSON.parse(localStorage.getItem("selectedAlphabet") || "[]");

    setSelectedCategories(savedCategories);
    setSelectedAlphabet(savedAlphabet);
    setIsLoaded(true); // Ensure state updates before fetching
  }, []);

  // Fetch recipes only after filters are loaded
  useEffect(() => {
    if (isLoaded) {
      handleFiltersUpdate();
    }
  }, [selectedAlphabet, selectedCategories, isLoaded]);

  // Update localStorage whenever filters change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories));
      localStorage.setItem("selectedAlphabet", JSON.stringify(selectedAlphabet));
    }
  }, [selectedCategories, selectedAlphabet]);

  const handleFiltersUpdate = async () => {
    let fetchedRecipes: any[] = [];

    if (selectedAlphabet.length > 0) {
      fetchedRecipes = await RecipeAPI.getByAlphabet(selectedAlphabet);
    }

    if (selectedCategories.length > 0) {
      if (fetchedRecipes.length > 0) {
        fetchedRecipes = fetchedRecipes.filter((recipe) => selectedCategories.includes(recipe.strCategory));
      } else {
        fetchedRecipes = await RecipeAPI.getByCategory(selectedCategories);
      }
    }

    setRecipes(fetchedRecipes);
  };

  return (
    <>
      <Hero image={foodHero} />
      <FilterBar options={categories} selectedFilters={selectedCategories} setSelectedFilters={setSelectedCategories} />
      <FilterBar options={alphabet} selectedFilters={selectedAlphabet} setSelectedFilters={setSelectedAlphabet} />
      <CommaList items={[...selectedCategories, ...selectedAlphabet]} />

      {/* Recipe Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">No recipes match your filters.</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
