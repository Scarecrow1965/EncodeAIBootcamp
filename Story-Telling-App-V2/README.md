# Weekend Project
To consolidate this week's knowledge, students should complete the following project:
1.  Create a GitHub repository for your project.
  -Done
2.  Add all group members as collaborators.
  -Done
3.  Create a README.md file with your project description.
  -Done
4.  Use the story-telling-app as a base repository or create a new application from scratch using NextJS.
  -Directions located below to create a new app with base files.
5.  Implement a table of characters that users can create for the story:
  -  Users should be able to add, edit, and delete characters; and
  -  Each new character should have a name, description, and personality.
6.  Customize the prompt to generate a story using user-created characters, if any.
7.  Implement a summary of each character's role in the story after the full text has been generated.
8.  Test different models for story generation and compare their outputs:
  -  Evaluate how well the models "remember" user-created characters;
  -  Experiment with different context window sizes across models to observe their impact on output; and
  -  Test models of varying sizes and observe how this influences the output.
    - Use models compatible with your device, focusing on the experiment rather than overall story quality.

# Instruction on how to create the base app
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
   npx create-next-app@latest story-telling-app
   ```
   - You can give any name to your project by replacing `story-telling-app` with your preferred name
   - Pick all the default options when prompted
     - ✔ Would you like to use TypeScript? … No / **Yes**
     - ✔ Would you like to use ESLint? … No / **Yes**
     - ✔ Would you like to use Tailwind CSS? … No / **Yes**
     - ✔ Would you like to use `src/` directory? … **No** / Yes
     - ✔ Would you like to use App Router? (recommended) … No / **Yes**
     - ✔ Would you like to customize the default import alias (@/\*)? … **No** / Yes

4. Navigate to the newly created project folder:
   ```bash
   cd story-telling-app
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
  - Using your editor, download the 'page.tsx' file in GitHub and replace 'page.tsx' located in the '{story-telling-app}/app' folder with it.
  - Using your editor, navigate to 'app' folder and create another folder callled 'api', then navigate to the 'api' folder and create three more folders: 'chat'.
  - Using your editor, download the 'route.ts' file in GitHub and ensure you navigate to the chat folder and save it there.

9. You now have the base app installed into your computer. MORE TO FOLLOW
    
10. Once you are satified with it, start the development server:
   ```bash
   npm run dev
   ```

11. Open your browser and navigate to `http://localhost:3000` to see your NextJS project running
