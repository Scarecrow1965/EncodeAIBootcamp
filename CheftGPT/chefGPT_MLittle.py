from openai import OpenAI

def is_ingredient_list(text):
    # if the text contains commas or "and", it's likely a list of ingredients
    return "," in text.lower() or " and " in text.lower()

def is_recipe(text):
    # if the text contains cooking-related keywords, it's likely a recipe
    recipe_keywords = ["cup", "tablespoon", "teaspoon", "mix", "cook", "bake", "boil", "minutes", "heat"]
    return any(keyword in text.lower() for keyword in recipe_keywords)

client = OpenAI()
messages = [
    {
        "role": "system",
        "content": """You are a seasoned Italian chef who specializes in pasta-making. You speak with an Italian accent 
        and are passionate about authentic Italian cuisine. Follow these rules strictly:

        1. For ingredient lists (when users list ingredients):
           - Only suggest possible Italian dish names that can be made
           - Don't provide full recipes
           - Format: "With these ingredients, you could make: [dish names]"

        2. For dish name requests:
           - If it's an Italian dish: Provide a detailed recipe with ingredients and steps
           - If it's not Italian: Politely decline and suggest an Italian alternative
           - Format recipe as: "Ingredients: [list]\nSteps: [numbered steps]"

        3. For full recipe critiques (when users share their recipe):
           - Provide constructive feedback
           - Suggest specific improvements
           - Point out what was done well
           - Format: "Feedback: [points]\nSuggested improvements: [list]"

        4. For invalid or unclear requests:
           - Politely ask for clarification
           - Explain the three ways you can help (ingredient suggestions, recipe requests, or recipe critiques)
        """
    }
]

print("Welcome to your Italian Chef Assistant! You can:\n"
      "1. List ingredients to get dish suggestions\n"
      "2. Request a recipe for a specific Italian dish\n"
      "3. Share a recipe for critique\n")

initial_input = input("What would you like to do?\n")

# Determine the type of input and set appropriate prompt
if is_ingredient_list(initial_input):
    prompt = f"Here are my ingredients: {initial_input}. What Italian dishes can I make?"
elif is_recipe(initial_input):
    prompt = f"Please critique this recipe: {initial_input}"
else:
    prompt = f"I would like the recipe for {initial_input}"

messages.append({"role": "user", "content": prompt})

stream = client.chat.completions.create(
    model="gpt-4",  
    messages=messages,
    stream=True,
)

collected_messages = []
for chunk in stream:
    chunk_message = chunk.choices[0].delta.content or ""
    print(chunk_message, end="")
    collected_messages.append(chunk_message)

messages.append({"role": "assistant", "content": "".join(collected_messages)})

while True:
    print("\n")
    user_input = input("What else would you like to know? (or type 'exit' to quit)\n")
    
    if user_input.lower() == 'exit':
        print("Arrivederci!")
        break

    if is_ingredient_list(user_input):
        prompt = f"Here are my ingredients: {user_input}. What Italian dishes can I make?"
    elif is_recipe(user_input):
        prompt = f"Please critique this recipe: {user_input}"
    else:
        prompt = f"I would like the recipe for {user_input}"

    messages.append({"role": "user", "content": prompt})
    
    stream = client.chat.completions.create(
        model="gpt-4",  
        messages=messages,
        stream=True,
    )
    
    collected_messages = []
    for chunk in stream:
        chunk_message = chunk.choices[0].delta.content or ""
        print(chunk_message, end="")
        collected_messages.append(chunk_message)
    
    messages.append({"role": "assistant", "content": "".join(collected_messages)})