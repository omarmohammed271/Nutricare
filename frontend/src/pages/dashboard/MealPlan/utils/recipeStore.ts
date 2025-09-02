import { Recipe, RecipeStore } from '../types/recipeStore';

class RecipeStoreImplementation implements RecipeStore {
  private _recipes: Recipe[] = [];

  addRecipe(recipeData: Omit<Recipe, 'id' | 'createdAt'>): void {
    const newRecipe: Recipe = {
      ...recipeData,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this._recipes.push(newRecipe);
  }

  getRecipes(): Recipe[] {
    return [...this._recipes];
  }

  getRecipeById(id: string): Recipe | undefined {
    return this._recipes.find(recipe => recipe.id === id);
  }

  get recipes(): Recipe[] {
    return [...this._recipes];
  }

  private generateId(): string {
    return `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Additional utility methods
  updateRecipe(id: string, updates: Partial<Recipe>): boolean {
    const index = this._recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      this._recipes[index] = { ...this._recipes[index], ...updates };
      return true;
    }
    return false;
  }

  deleteRecipe(id: string): boolean {
    const index = this._recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      this._recipes.splice(index, 1);
      return true;
    }
    return false;
  }

  clearRecipes(): void {
    this._recipes = [];
  }

  getRecipesByTag(tag: string): Recipe[] {
    return this._recipes.filter(recipe => 
      recipe.tags.some(recipeTag => 
        recipeTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }

  getPublicRecipes(): Recipe[] {
    return this._recipes.filter(recipe => recipe.isPublic);
  }
}

// Create and export a singleton instance
export const recipeStore = new RecipeStoreImplementation();