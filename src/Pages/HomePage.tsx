import { useState, useEffect } from "react";
import CommaList from "../Components/CommaList";
import FilterBar from "../Components/FilterBar";
import Hero from "../Components/Hero";
import RecipeCard from "../Components/RecipeCard"; // Import DishCard
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
  const [recipes, setRecipes] = useState<any[]>([]); // Store fetched recipes

  useEffect(() => {
    handleFiltersUpdate();
  }, [selectedAlphabet,selectedCategories]); // Fetch recipes only when alphabet filter changes

  const handleFiltersUpdate = async () => {
    if (selectedAlphabet.length > 0) {
      const fetchedRecipes = await RecipeAPI.getByAlphabet(selectedAlphabet);
      setRecipes(fetchedRecipes);
    }
    if (selectedCategories.length > 0)
    {
        if(recipes.length > 0) {
            setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => selectedCategories.includes(recipe.strCategory)))
        }
        else {
            const fetchedRecipes = await RecipeAPI.getByCategory(selectedCategories);
            setRecipes(fetchedRecipes);
        }
    }
    if(selectedAlphabet.length < 1 && selectedCategories.length < 1)
    {
        setRecipes([]);
    }
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
