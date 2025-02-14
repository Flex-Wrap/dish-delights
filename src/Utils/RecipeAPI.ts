class RecipeAPI {
  private static BASE_URL = "https://www.themealdb.com/api/json/v1/1";
  private static ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Fetch recipes starting with a specific letter (local first)
  static async getByAlphabet(letters: string[]) {
      try {
          // Get local recipes
          const localRecipes = JSON.parse(localStorage.getItem("localRecipes") || "[]");

          // Filter local recipes by first letter
          const filteredLocal = localRecipes.filter((recipe: any) => 
              letters.some(letter => recipe.strMeal.toUpperCase().startsWith(letter))
          );

          // Fetch API recipes
          const responses = await Promise.all(
              letters.map(letter =>
                  fetch(`${this.BASE_URL}/search.php?f=${letter}`).then(res => res.json())
              )
          );

          // Flatten results and remove null values
          const apiMeals = responses.flatMap(data => data.meals || []);

          return [...filteredLocal, ...apiMeals]; // Combine local + API recipes
      } catch (error) {
          console.error("Error fetching recipes by multiple letters:", error);
          return [];
      }
  }

  // Fetch recipes by category (local first)
  static async getByCategory(categories: string[]) {
      try {
          // Get local recipes
          const localRecipes = JSON.parse(localStorage.getItem("localRecipes") || "[]");

          // Filter local recipes by category
          const filteredLocal = localRecipes.filter((recipe: any) => categories.includes(recipe.strCategory));

          // Fetch API recipes
          const responses = await Promise.all(
              categories.map(category =>
                  fetch(`${this.BASE_URL}/filter.php?c=${category}`)
                      .then(res => res.json())
                      .then(data => (data.meals || []).map((meal: any) => ({ ...meal, strCategory: category })))
              )
          );

          // Flatten API results
          const apiMeals = responses.flat();

          return [...filteredLocal, ...apiMeals]; // Combine local + API recipes
      } catch (error) {
          console.error("Error fetching recipes by multiple categories:", error);
          return [];
      }
  }

  // Fetch a single recipe by ID (checks localStorage if "local" prefix)
  static async getById(id: string) {
      try {
          if (id.startsWith("local")) {
              // Get local recipes and find matching ID
              const localRecipes = JSON.parse(localStorage.getItem("localRecipes") || "[]");
              return localRecipes.find((recipe: any) => recipe.idMeal === id) || null;
          } else {
              // Fetch from API
              const response = await fetch(`${this.BASE_URL}/lookup.php?i=${id}`);
              const data = await response.json();
              return data.meals ? data.meals[0] : null;
          }
      } catch (error) {
          console.error("Error fetching recipe by ID:", error);
          return null;
      }
  }

  // Fetch recipes sequentially from A-Z until we reach the required number (local first)
  static async getRecipes(number: number) {
      try {
          const allRecipes: any[] = [];

          // Get all local recipes first
          const localRecipes = JSON.parse(localStorage.getItem("localRecipes") || "[]");
          allRecipes.push(...localRecipes);

          // Fetch API recipes until we reach the required count
          for (const letter of this.ALPHABET) {
              if (allRecipes.length >= number) break;

              const fetchedRecipes = await this.getByAlphabet([letter]);
              allRecipes.push(...fetchedRecipes);

              if (allRecipes.length >= number) break;
          }

          return allRecipes.slice(0, number); // Ensure exactly `number` recipes
      } catch (error) {
          console.error("Error fetching recipes:", error);
          return [];
      }
  }
}

export default RecipeAPI;
