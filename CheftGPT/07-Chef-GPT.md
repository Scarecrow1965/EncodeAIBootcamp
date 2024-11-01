# Building a Prompt for Chef GPT

1. Make sure that you have set up your keys correctly with the exercise `01-OpenAI-Key.md` from Lesson 01

2. Make sure that your `venv` is activated

3. Run the following code on your terminal:

   ```text
   pip install openai
   ```

   - This command will install the `openai` [API Package](https://github.com/openai/openai-python) on your environment

4. Create a new Python file

   - Create a new file on your favorite code editor or simply run `touch <filename>.py` on your terminal (Linux/MacOS) or `type nul > <filename>.py` on your terminal (Windows)

   - Remember to replace `<filename>` with the name of your file

5. Import the `openai` module on your file

   ```python
    from openai import OpenAI
   ```

   - This `client` can abstract all of the complexities of consuming the OpenAI API endpoints, like handling the authentication, the request and response formats, synchronous and asynchronous requests, and many other features

   - To use this library correctly, all you need to do is to understand well the [API parameters](https://platform.openai.com/docs) that you want to consume

6. Create a new `client` instance

   ```python
    client = OpenAI()
   ```

   - By default, this will try to use the `OPENAI_API_KEY` environment variable to create this client

   - You can customize the logic by doing an explicit definition like this:

   ```python
   import os
   from openai import OpenAI
   client = OpenAI(
       api_key=os.environ.get("OPENAI_API_KEY"),
   )
   ```

   - Here you can change `api_key` to any value that you want to use

   - Have caution if you prefer to hardcode your key in this file, since this could lead yo you inadvertently sharing your key with others

7. Configure a specific `purpose` and `instruction sets` for the `system` role as the first message in the `messages` list

   ```python
   messages = [
        {
             "role": "system",
             "content": "You are an experienced chef that helps people by suggesting detailed recipes for dishes they want to cook. You can also provide tips and tricks for cooking and food preparation. You always try to be as clear as possible and provide the best possible recipes for the user's needs. You know a lot about different cuisines and cooking techniques. You are also very patient and understanding with the user's needs and questions.",
        }
   ]
   ```

   - The `role` parameter can be `user` or `system`

   - The `content` parameter is the message that will be sent to the API

8. Add another `system` instruction to guide on how to respond to the user's prompt

   ```python
   messages.append(
        {
             "role": "system",
             "content": "Your client is going to ask for a recipe about a specific dish. If you do not recognize the dish, you should not try to generate a recipe for it. Do not answer a recipe if you do not understand the name of the dish. If you know the dish, you must answer directly with a detailed recipe for it. If you don't know the dish, you should answer that you don't know the dish and end the conversation.",
        }
   )
   ```

   - This way you can try and attempt to guide how the model should behave if the user types an unexpected input

9. Receive the name of the dish from the user and place it inside the `messages` list

   ```python
   dish = input("Type the name of the dish you want a recipe for:\n")
   messages.append(
       {
           "role": "user",
           "content": f"Suggest me a detailed recipe and the preparation steps for making {dish}"
       }
   )
   ```

10. Specify the model to use:

    ```python
    model = "gpt-4o-mini"
    ```

11. Call the [Chat Completion](https://platform.openai.com/docs/guides/text-generation/chat-completions-api) endpoint in the `client` in a loop with the following parameters:

    ```python
    stream = client.chat.completions.create(
        model=model,
        messages=messages,
        stream=True,
    )
    for chunk in stream:
        print(chunk.choices[0].delta.content or "", end="")
    ```

12. Run the file

    ```text
    # Linux/MacOS
    python <filename>.py
    ```

    ```text
    # Windows
    py <filename>.py
    ```

13. You can extend the script to allow the user to continue the conversation after the first response

14. Before appending the next user message to the `messages` list, you should collect and append the last system message to the `messages` list on your script

    ```python
    collected_messages = []
    for chunk in stream:
        chunk_message = chunk.choices[0].delta.content or ""
        print(chunk_message, end="")
        collected_messages.append(chunk_message)

    messages.append(
        {
            "role": "system",
            "content": "".join(collected_messages)
        }
    )
    ```

15. You can then append the next user message to the `messages` list and call the `client` again

    ```python
    while True:
        print("\n")
        user_input = input()
        messages.append(
            {
                "role": "user",
                "content": user_input
            }
        )
        stream = client.chat.completions.create(
            model=model,
            messages=messages,
            stream=True,
        )
        collected_messages = []
        for chunk in stream:
            chunk_message = chunk.choices[0].delta.content or ""
            print(chunk_message, end="")
            collected_messages.append(chunk_message)

        messages.append(
            {
                "role": "system",
                "content": "".join(collected_messages)
            }
        )
    ```

16. To stop the process you can use `Ctrl+C` on your terminal (or `Cmd+C` in MacOS)
