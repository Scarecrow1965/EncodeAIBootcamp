// Original source:
// import Image from "next/image";
// 
// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>
// 
//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

// from Lesson 8, 04-Story-Telling.md
// "use client";
// 
// import { useState } from "react";
// import { useChat } from "ai/react";
// 
// export default function Chat() {
//   const { messages, append, isLoading } = useChat();
//   const genres = [
//     { emoji: "🧙", value: "Fantasy" },
//     { emoji: "🕵️", value: "Mystery" },
//     { emoji: "💑", value: "Romance" },
//     { emoji: "🚀", value: "Sci-Fi" },
//   ];
//   const tones = [
//     { emoji: "😊", value: "Happy" },
//     { emoji: "😢", value: "Sad" },
//     { emoji: "😏", value: "Sarcastic" },
//     { emoji: "😂", value: "Funny" },
//   ];
// 
//   const [state, setState] = useState({
//     genre: "",
//     tone: "",
//   });
// 
//   const handleChange = ({
//     target: { name, value },
//   }: React.ChangeEvent<HTMLInputElement>) => {
//     setState({
//       ...state,
//       [name]: value,
//     });
//   };
// 
//   return (
//     <main className="mx-auto w-full p-24 flex flex-col">
//       <div className="p4 m-4">
//         <div className="flex flex-col items-center justify-center space-y-8 text-white">
//           <div className="space-y-2">
//             <h2 className="text-3xl font-bold">Story Telling App</h2>
//             <p className="text-zinc-500 dark:text-zinc-400">
//               Customize the story by selecting the genre and tone.
//             </p>
//           </div>
// 
//           <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
//             <h3 className="text-xl font-semibold">Genre</h3>
// 
//             <div className="flex flex-wrap justify-center">
//               {genres.map(({ value, emoji }) => (
//                 <div
//                   key={value}
//                   className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
//                 >
//                   <input
//                     id={value}
//                     type="radio"
//                     value={value}
//                     name="genre"
//                     onChange={handleChange}
//                   />
//                   <label className="ml-2" htmlFor={value}>
//                     {`${emoji} ${value}`}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
// 
//           <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
//             <h3 className="text-xl font-semibold">Tones</h3>
// 
//             <div className="flex flex-wrap justify-center">
//               {tones.map(({ value, emoji }) => (
//                 <div
//                   key={value}
//                   className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
//                 >
//                   <input
//                     id={value}
//                     type="radio"
//                     name="tone"
//                     value={value}
//                     onChange={handleChange}
//                   />
//                   <label className="ml-2" htmlFor={value}>
//                     {`${emoji} ${value}`}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
// 
//           <button
//             type = "button"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//             disabled={isLoading || !state.genre || !state.tone}
//             onClick={() =>
//               append({
//                 role: "user",
//                 content: `Generate a ${state.genre} story in a ${state.tone} tone`,
//               })
//             }
//           >
//             Generate Story
//           </button>
// 
//           <div
//             hidden={
//               messages.length === 0 ||
//               messages[messages.length - 1]?.content.startsWith("Generate")
//             }
//             className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
//           >
//             {messages[messages.length - 1]?.content}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// new code
"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();

  const genres = [
    { value: "Fantasy" },
    { value: "Mystery" },
    { value: "Romance" },
    { value: "Sci-Fi" },
  ];

  const tones = [
    { value: "Happy" },
    { value: "Sad" },
    { value: "Sarcastic" },
    { value: "Funny" },
  ];

  type Character = {
    name: string;
    description: string;
    personality: string;
  };

  // Pre-generated characters array
  const initialCharacters: Character[] = [
    { name: "Alice", description: "A brave adventurer", personality: "Bold and curious" },
    { name: "Bob", description: "A witty detective", personality: "Clever and sharp" },
    { name: "Charlie", description: "A loyal friend", personality: "Kind and supportive" },
    { name: "Diana", description: "A mysterious stranger", personality: "Reserved but insightful" },
  ];

  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [newCharacter, setNewCharacter] = useState<Character>({ name: "", description: "", personality: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [state, setState] = useState({
    genre: "",
    tone: "",
  });

  // Handle changes in genre and tone selection
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleAddCharacter = () => {
    if (editingIndex !== null) {
      // Update existing character
      const updatedCharacters = [...characters];
      updatedCharacters[editingIndex] = newCharacter;
      setCharacters(updatedCharacters);
      setEditingIndex(null);
    } else {
      // Add new character
      setCharacters([...characters, newCharacter]);
    }
    setNewCharacter({ name: "", description: "", personality: "" });
  };

  // Edit a character by index
  const handleEditCharacter = (index: number) => {
    setEditingIndex(index);
    setNewCharacter(characters[index]);
  };

  // Delete a character by index
  const handleDeleteCharacter = (index: number) => {
    setCharacters(characters.filter((_, i) => i !== index));
  };

  // Generate the story prompt using selected genre, tone, and characters
  const generateStoryPrompt = () => {
    const characterDescriptions = characters
      .map(char => `${char.name} - ${char.description}, ${char.personality}`)
      .join("; ");
    return `Generate a ${state.genre} story in a ${state.tone} tone, using the following characters: ${characterDescriptions}`;
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col response-box2">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Story Telling App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the story by selecting the genre, tone, and characters.
            </p>
          </div>

          {/* Genre Selection */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>
            <div className="flex flex-wrap justify-center">
              {genres.map(({ value }) => (
                <div key={value} className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>
            <div className="flex flex-wrap justify-center">
              {tones.map(({ value }) => (
                <div key={value} className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Character Management */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Characters</h3>
            <table className="table-auto w-full text-white">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Personality</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {characters.map((char, index) => (
                  <tr key={index}>
                    <td>{char.name}</td>
                    <td>{char.description}</td>
                    <td>{char.personality}</td>
                    <td>
                      <button onClick={() => handleEditCharacter(index)}>Edit</button>
                      <button onClick={() => handleDeleteCharacter(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Name"
                value={newCharacter.name}
                onChange={e => setNewCharacter({ ...newCharacter, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                value={newCharacter.description}
                onChange={e => setNewCharacter({ ...newCharacter, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Personality"
                value={newCharacter.personality}
                onChange={e => setNewCharacter({ ...newCharacter, personality: e.target.value })}
              />
              <button onClick={handleAddCharacter}>
                {editingIndex !== null ? "Save" : "Add"} Character
              </button>
            </div>
          </div>

          {/* Generate Story Button */}
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.genre || !state.tone || !characters.length}
            onClick={() =>
              append({
                role: "user",
                content: generateStoryPrompt(),
              })
            }
          >
            Generate Story
          </button>

          {/* Display Story */}
          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4 response-box1"
          >
            {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>
    </main>
  );
}
