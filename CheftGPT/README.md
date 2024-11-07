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

ChefGPT_MLittle_I2.py
The AI assistant is an Italian American from The Bronx in New York City and is passionate about Italian cuisine but doesn't have deep knowledge.  As such, this persona will answer questions like "Poutine" and "Hoagie" and respond with an Italian flare where the Italian chef will not entertain these questions.

ChefGPT-Scarecrow1965.py
Is the basic Italian chef that should provide healthy dishes which ingredients should be compliant with both imerial and metric measurements.

Chef-GPT_itsjenm.py In this modified script. The AI is a world class professional chef that specializes in creating cuisines inspired by hit TV shows. This AI assistant chef specializes in combining central american and asian flavors.

## Prerequisites

- Python 3.7+
- OpenAI API key
- Required Python packages:
for Linux/MacOS:
  ```bash
  pip install openai
for Windows:
 ```command prompt
  pip install openai
