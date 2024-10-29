import os
import openai

from openai import OpenAI

# set up variables first
# next line commented out for security reasons
#set OPEN_API_KEY = # insert your API key here
#set PROJECT_ID = # insert your project id
# specify the model that openai will use
model = "gpt-4o-mini"
# ensure you have used your openai key before you use this program
client = OpenAI()
# or use this to explicitly define the client instance and if you want to hardcode your API key
#client = OpenAI(
#   api_key=os.environ.get("OPENAI_API_KEY"),
#    project: "$PROJECT_ID",
#)

# Replace with your actual API key or ensure it's set in your environment
# openai.api_key = os.environ.get("OPENAI_API_KEY")

# Set up for basic Italian cuisine rules to the user
print("Welcome to Italian cuisine! I am your Italian Chef, Andreas.\n"
      "Here are your options:\n"
      "1. Request a dish's name based on ingredients you provide.\n"
      "2. Request a recipe for a specific Italian dish.\n"
      "3. Provide a list of ingredients for an Italian meal, and I will critique it.\n"
      "Note: type 'exit' to quit.\n")

#Program the AI to respond to three specific types of user inputs:
#   a. Ingredient-based dish suggestions
#   b. Recipe requests for specific dishes
#   c. Recipe critiques and improvement suggestions
#- If the user's initial input doesn't match these scenarios, politely decline and prompt for a valid request.
#     - For ingredient inputs: Suggest only dish names without full recipes.
#     - For dish name inputs: Provide a detailed recipe.
#     - For recipe inputs: Offer a constructive critique with suggested improvements. 

# ideas came from template and https://www.learnprompt.org/act-as-chat-gpt-prompts/
# System role definitions for ChefGPT
messages = [
    {
        "role": "system",
        "content": """You are an experienced Italian chef named Andreas.
        You specialize in Italian cuisine and know a lot about Italian cooking techniques.

        Respond to the user based on these scenarios:
        1. If the user provides a list of ingredients, suggest only the dish name without a full recipe. 
        2. If the user asks for a specific Italian dish, provide a detailed recipe, that are nutritionally beneficial but also easy & not time consuming, including ingredient measurements in both metric and imperial units.
        3. If the user provides a recipe, offer feedback with constructive critique and suggested improvements.
        
        If the user's input does not fit these scenarios or includes ingredients not typical in Italian cuisine, politely decline and prompt them for a valid request.
        """
    }
]

# Main loop for user interaction
while True:
    user_input = input("What would you like to do? ")

    # Exit condition
    if user_input.lower() == "exit":
        print("Ciao! Enjoy your meal!")
        break
    
    # Append user input to the conversation
    messages.append({"role": "user", "content": user_input})

    # Stream the response from the AI
    stream = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        stream=True,
    )

    # Collect and print the streamed response
    collected_messages = []
    for chunk in stream:
        chunk_message = chunk['choices'][0].get('delta', {}).get('content', "")
        print(chunk_message, end="", flush=True)
        collected_messages.append(chunk_message)

    # Store the full AI response in the messages list
    messages.append({"role": "system", "content": "".join(collected_messages)})
    print("\n")  # Print a new line for spacing between interactions

