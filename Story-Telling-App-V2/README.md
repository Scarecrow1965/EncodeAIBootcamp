<a id="readme-top"></a>
<!-- TITLE -->
<h2 align="center">Story Telling App</h2>
<p align="center">A dynamic web application that generates creative stories based on custom characters, genres, and tones. Built with React and Next.js, this app provides an interactive interface for creating and managing characters while generating unique stories through an AI-powered backend.</p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
        <li><a href="#character-management">Character Management</a></li>
        <li><a href="#story-customization">Story Cutomization</a></li>
        <li><a href="#various-tone-selections">Various Tone Selection</a></li>
        <li><a href="#real-time-story-generation">Real-Time Story Generation</a></li>
      </ul>
     </li>
    <li><a href="technical-features">Technical Features</a></li>
    <li><a href="usage">Usage</a></li>
    <li><a href="error-handling">Error Handling</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

##  About the Project
To consolidate this week's knowledge, students should complete the following project:
1.  Create a GitHub repository for your project.
  -  Done
2.  Add all group members as collaborators.
  -  Done
3.  Create a README.md file with your project description.
  -  Done
4.  Use the story-telling-app as a base repository or create a new application from scratch using NextJS.
  -  Directions located below to create a new app with base files.
  -  Done
5.  Implement a table of characters that users can create for the story:
  -  Users should be able to add, edit, and delete characters; and
  -  Each new character should have a name, description, and personality.
  -  Done
6.  Customize the prompt to generate a story using user-created characters, if any.
  -  Done
7.  Implement a summary of each character's role in the story after the full text has been generated.
8.  Test different models for story generation and compare their outputs:
  -  Evaluate how well the models "remember" user-created characters;
  -  Experiment with different context window sizes across models to observe their impact on output; and
  -  Test models of varying sizes and observe how this influences the output.
    - Use models compatible with your device, focusing on the experiment rather than overall story quality.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

###  Built With

* [![npm][npmjs][npmjs-url]
* [![Next][Next.js]][Next-url]
* [![React][React.js][React-url]
* [![Tailwind CSS][Tailwindcss]][Tailwindcss-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
##  Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PREREQUISITES -->
###  Prerequisites

A knowledge of using the Linux/Mac OS bash commands or Windows Command Prompt is necessary.
installion of npm
The items that will be required are already built into the installation instuctions.
Please follow the instructions.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- INSTALLATION -->
###  Installation
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

5. Due to the warnings listed when you installed '{story-telling-app}', we will correct these by updating each dependency:
  ```bash
  npm update eslint
  npm update rimraf
  npm update glob
  ```

6. Add other important libraries:
```bash
npm install ai @ai-sdk/openai
npm install ai openai
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

10. Run the Text Generation WebUI application with the API server enabled.
11. Make sure that the API server is accepting requests on the port you configured
  -  Check also if you have loaded a model in the Text Generation WebUI application
    

- Commented out for now:
13. Once you are satified with it, start the development server:
   ```bash
   npm run dev
   ```
14. Open your browser and navigate to `http://localhost:3000` to see your NextJS project running

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->
## Features

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CHARACTER MANAGEMENT -->
### Character Management:

-  Create, edit, and delete characters
-  Define character names, descriptions, and personalities
-  Visual card-based character display

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- STORY CUSTOMIZATION -->
### Story Customization:
-  Multiple genre options:
-  Fantasy
-  Mystery
-  Romance
-  Sci-Fi

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- VARIOUS TONE SELECTIONS -->
### Various Tone Selections:

-  Happy
-  Sad
-  Sarcastic
-  Funny

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- REAL-TIME GENERATION -->
### Real-time Story Generation:

-  Stream-based story delivery
-  Intelligent text processing and formatting
-  Character role summaries

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECHNICAL FEATURES -->
##  Technical Features:

-  Server-side streaming response handling
-  Advanced text processing and cleaning
-  Responsive design
-  Dark mode UI
-  Error handling and loading states

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

1.  Add Characters
  -  Click the "Add Character" button
  -  Fill in the character's name, description, and personality
  -  Click "Add" to save the character

2.  Edit/Delete Characters
  -  Use the edit (pencil) icon to modify existing characters
  -  Use the trash icon to remove characters

3.  Select Story Parameters
  -  Choose a genre from the available options
  -  Select a tone for the story

4.  Generate Story
  -  Click the "Generate Story" button
  -  Wait for the story to be generated
  -  Review the generated story and character summaries

<p align="right">(<a href="#readme-top">back to top</a>)</p>

##  Error Handling

The application includes comprehensive error handling for:
-  Story generation failures
-  Invalid character data
-  Network issues
-  Stream processing errors

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTORS -->
##  Contributors

The following members contributed to this project:
-  MLittle
-  Scarecorw1965

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[npmjs]: https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg
[npmjs-url]: https://www.npmjs.com/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Tailwindcss]: https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg
[tailwindcss-url]: https://tailwindcss.com/

<p align="right">(<a href="#readme-top">back to top</a>)</p>
