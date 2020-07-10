import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeSubscription: Subscription;
  recipes: Recipe[];
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeSubscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes; 
          // This subscription actually makes sure that the real recipe array is populated with new ones
          // and not its copy
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
  
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route });
  }
}
