`Food Recipes API`

API created as technical task for Think Smart

Postman collection provided in the repo.

Routes:

User:

``/auth/register`` POST - register user
``/auth/login`` POST - login an user
``/auth/:recipeId`` POST - add recipe to user's favorites

Recipes: 

``/recipes/`` GET - fetch all recipes

``/recipes/:recipeId`` - fetch single recipe

``/recipes/`` POST - create a new recipe (authenticated user route)

``/recipes/:recipeId`` PUT - update a recipe (authenticated user route)

``/recipes/:recipeID`` DELETE - delete a recipe (admin route)

``/img/:recipeID`` GET - fetch the corresponding image of recipe
