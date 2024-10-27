# EncodeAIBootcamp
This is where we (Group #2) can insert our files together

ReadMe for ChefGPT_MLittle.py
# Italian Chef Assistant 🧑‍🍳

A conversational AI assistant that helps users with Italian cooking by providing recipe suggestions, detailed cooking instructions, and recipe critiques. The assistant embodies an Italian chef persona and specializes in authentic Italian cuisine.

## Features

- **Ingredient-based Dish Suggestions**: Input your available ingredients to get suggestions for Italian dishes
- **Detailed Recipe Instructions**: Request specific Italian recipes with step-by-step instructions
- **Recipe Critiques**: Get professional feedback and improvement suggestions for your recipes

Program uses basic pattern matching to determine which of the three features the user is asking about.  With commas and "ands", it is assumed to be a list of ingrediants and there is a small dictionary of cooking related keywords that indicate a recipe.  Anything outside of these patterns is assumed to be a request for recipe instructions (or potentially invalid).

## Prerequisites

- Python 3.7+
- OpenAI API key
- Required Python packages:
  ```bash
  pip install openai
