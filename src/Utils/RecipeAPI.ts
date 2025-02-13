class RecipeAPI {
    private static BASE_URL = "https://www.themealdb.com/api/json/v1/1";
    private static ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
    // Fetch recipes starting with a specific letter
    static async getByAlphabet(letters: string[]) {
        try {
          // Fetch all meals for each letter and wait for all responses
          const responses = await Promise.all(
            letters.map(letter =>
              fetch(`${this.BASE_URL}/search.php?f=${letter}`).then(res => res.json())
            )
          );
      
          // Flatten results and filter out null values
          const meals = responses.flatMap(data => data.meals || []);
      
          return meals;
        } catch (error) {
          console.error("Error fetching recipes by multiple letters:", error);
          return [];
        }
      }
      

      static async getByCategory(categories: string[]) {
        try {
          // Fetch all meals for each category and wait for all responses
          const responses = await Promise.all(
            categories.map(category =>
              fetch(`${this.BASE_URL}/filter.php?c=${category}`)
                .then(res => res.json())
                .then(data => (data.meals || []).map((meal: any) => ({ ...meal, strCategory: category }))) // Add category
            )
          );
      
          // Flatten results into a single array
          const meals = responses.flat();
      
          return meals;
        } catch (error) {
          console.error("Error fetching recipes by multiple categories:", error);
          return [];
        }
      }           
      
  
    // Fetch a single recipe by ID
    static async getById(id: string) {
      try {
        const response = await fetch(`${this.BASE_URL}/lookup.php?i=${id}`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
      } catch (error) {
        console.error("Error fetching recipe by ID:", error);
        return null;
      }
    }
  
    // Fetch recipes sequentially from A-Z until we reach the required number
    static async getRecipes(number: number) {
      try {
        const allRecipes: any[] = [];
  
        for (const letter of this.ALPHABET) {
          if (allRecipes.length >= number) break;
  
          const fetchedRecipes = await this.getByAlphabet([letter]);
          allRecipes.push(...fetchedRecipes);
          
          if (allRecipes.length >= number) break;
        }
  
        return allRecipes.slice(0, number); // Ensure we return exactly `number` recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
      }
    }
  }
export default RecipeAPI;
  