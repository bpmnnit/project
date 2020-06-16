import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Button } from 'protractor';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10),
  ];
  
  getIngredients() {
    return this.ingredients.slice(); // returns the copy of the ingredients array, using the slice() function.
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    // The above code is a viable solution but, it emits a lot of events.
    this.ingredients.push(...ingredients); // ... operator converts an array to a list of items. ([] => 1, 2, 3 etc)
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}