# Food Recipes API

API created as technical task for Think Smart

API was deployed to Heroku: https://food-recipes-think-smart.herokuapp.com/

Newest Postman collection provided in the repo. Use this one because it has Heroku app url provided.

## Routes:

User:

`/auth/register` POST - register user

`/auth/login` POST - login an user

`/auth/:recipeId` POST - add recipe to user's favorites

Recipes:

`/recipes/` GET - fetch all recipes

`/recipes/:recipeId` GET - fetch single recipe

`/recipes/img/:recipeId` GET - fetch the corresponding image of recipe

`/recipes/` POST - create a new recipe (authenticated user route)

`/recipes/:recipeId` PUT - update a recipe (authenticated user route)

`/recipes/:recipeId` DELETE - delete a recipe (admin route)

Categories:

`/categories/` GET - fetch all categories

`/categories/recipes` GET - fetch all recipes of one category

`/categories/img/:categoryId` GET - fetch the corresponding image of category

`/categories/` POST - create a new category (authenticated user route)

`/categories/:categoryId` PUT - update a recipe (authenticated user route)

`/categories/:categoryId` DELETE - delete a recipe (admin route)

