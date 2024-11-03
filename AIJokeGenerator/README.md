# AI Joke Generator Homework
Here is what the homework stated:

To consolidate the knowledge acquired this week, students should complete the following project:
1. Create a GitHub repository for your project:
 - Done
3. Add all members of your group as collaborators:
 - Done
4. Create a README.md file with a description of your project:
 - Done
5. Create a new application from scratch using NextJS:
- Listed below
6. Develop a page for generating jokes using AI:
- Listed as page.tsx
7. Add a feature for users to customize the Joke Parameters:
   - Choose which parameters you'd like to offer your users
   - For example, allow users to select:
     - A topic from a list of options (work, people, animals, food, television, etc.)
     - A tone for the joke (witty, sarcastic, silly, dark, goofy, etc.)
     - The type of joke (pun, knock-knock, story, etc.)
     - The "temperature" (how much randomness/creativity to add to the joke)
   - Consider how you'll construct the prompt for the AI model to adhere to these parameters.
- Listed as page.tsx
8. After configuring the parameters, users should click a button to generate the joke, and the generated response must be displayed on the user's screen within the same page.
9. Add a feature for the AI to evaluate if the generated jokes are "funny", "appropriate", "offensive", or other criteria you deem important.
10. Experiment with different prompts and system instructions to optimize generalist AI models for "subjective" classification tasks like humor, appropriateness, offensiveness, etc..

----------------------------------------------------------------------
# Para 5 and 6: Installation instructions:
- Due to the size limitations within GitHub, it is not possible to install the AI Joke Generator App into this space.
- As such here are the instructions on how to install said application:
1.  Open a command prompt window (for windows users) or a ______ (for Apple/Linux Users)
2. Create a new folder for your projects:
   ```bash
   mkdir my-projects
   cd my-projects
   ```
   > Pick a _safe_ location on your computer to store your projects. You can use the `Documents`, `Desktop`, or any other folder you prefer.

3. Create a new NextJS project using the following command:
   ```bash
   npx create-next-app@latest ai-joke-app
   ```
   - You can give any name to your project by replacing `ai-joke-app` with your preferred name
   - Pick all the default options when prompted
     - ✔ Would you like to use TypeScript? … No / **Yes**
     - ✔ Would you like to use ESLint? … No / **Yes**
     - ✔ Would you like to use Tailwind CSS? … No / **Yes**
     - ✔ Would you like to use `src/` directory? … **No** / Yes
     - ✔ Would you like to use App Router? (recommended) … No / **Yes**
     - ✔ Would you like to customize the default import alias (@/\*)? … **No** / Yes

4. Navigate to the newly created project folder:
   ```bash
   cd ai-joke-app
   ```

5. Due to the warnings listed when you installed '{ai-joke-app}', we will correct these by:
  ```bash
  npm update eslint
  npm update rimraf
  npm update glob
  ```

6. Add another important dependency library:
```bash
npm install ai @ai-sdk/openai
```

7. **** NOTE: Configure OPEN API KEY to a local envirnoment variable if you have not already done so. ****
  - If not then:
    - Create a `.env.local` file in the root of the project
    - Add the OpenAI API key variable in the file by inserting this: `OPENAI_API_KEY=xxxxxxxxx`
    - Replace `xxxxxxxxx` with your OpenAI API key

8. Download each file that is tied to this GihHub folder and transfer them to the respective locations, using a file explorer and viewed into your editor. Here's how you do it:
  - Using your editor, download the 'page.tsx' in GitHub and replace 'page.tsx' located in the '{ai-joke-app}/app' folder with it.
  - Using your editor, navigate to 'app' folder and create another folder callled 'api', then navigate to the 'api' folder and create three more folders: 'chat', 'evaluate', and 'generate'.
  - Download each ____-route.ts file and when saving them, ensure you navigate to the ____ folder and saved them as route.ts into each respective folder.

9. You now have the base app installed into your computer. If you want to change the look, feel, and the system propmts or rules, you may do so through the 'page.tsx' file.
    
10. Once you are satified with it, start the development server:
   ```bash
   npm run dev
   ```

11. Open your browser and navigate to `http://localhost:3000` to see your NextJS project running

12. Enjoy!!! 
