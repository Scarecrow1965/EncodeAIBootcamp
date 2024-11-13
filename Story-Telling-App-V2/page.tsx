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

// Scarecrow1965's version
// "use client";
// 
// import { useState, useEffect } from "react";
// import { useChat } from "ai/react";
// 
// export default function Chat() {
//   const { messages, append, isLoading } = useChat();
// 
//   const genres = [
//     { emoji: "🧙", value: "Fantasy" },
//     { emoji: "🕵️", value: "Mystery" },
//     { emoji: "💑", value: "Romance" },
//     { emoji: "🚀", value: "Sci-Fi" },
//   ];
// 
//   const tones = [
//     { emoji: "😊", value: "Happy" },
//     { emoji: "😢", value: "Sad" },
//     { emoji: "😏", value: "Sarcastic" },
//     { emoji: "😂", value: "Funny" },
//   ];
// 
//   type Character = {
//     name: string;
//     description: string;
//     personality: string;
//   };
// 
//   // Pre-generated characters array
//   const initialCharacters: Character[] = [
//     { name: "Alice", description: "A brave adventurer", personality: "Bold and curious" },
//     { name: "Bob", description: "A witty detective", personality: "Clever and sharp" },
//     { name: "Charlie", description: "A loyal friend", personality: "Kind and supportive" },
//     { name: "Diana", description: "A mysterious stranger", personality: "Reserved but insightful" },
//   ];
// 
//   const [characters, setCharacters] = useState<Character[]>(initialCharacters);
//   const [newCharacter, setNewCharacter] = useState<Character>({ name: "", description: "", personality: "" });
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
// 
//   const [state, setState] = useState({
//     genre: "",
//     tone: "",
//   });
// 
//    // Client-side check
//    const [isClient, setIsClient] = useState(false);
//    useEffect(() => {
//      setIsClient(true);
//    }, []);
// 
//   // Handle changes in genre and tone selection
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setState({
//       ...state,
//       [name]: value,
//     });
//   };
// 
//   if (!isClient) return null; // Prevents rendering on the server
// 
//   const handleAddCharacter = () => {
//     // Validate that all fields are filled out
//     if (!newCharacter.name.trim() || !newCharacter.description.trim() || !newCharacter.personality.trim()) {
//       alert("Please fill out all character fields before adding.");
//       return; // Exit without adding if validation fails
//     }
//     if (editingIndex !== null) {
//       // Update existing character
//       const updatedCharacters = [...characters];
//       updatedCharacters[editingIndex] = newCharacter;
//       setCharacters(updatedCharacters);
//       setEditingIndex(null);
//     } else {
//       // Add new character
//       setCharacters([...characters, newCharacter]);
//     }
//     // Clear the input fields
//     setNewCharacter({ name: "", description: "", personality: "" });
//   };
// 
//   // Edit a character by index
//   const handleEditCharacter = (index: number) => {
//     setEditingIndex(index);
//     setNewCharacter(characters[index]);
//   };
// 
//   // Delete a character by index
//   const handleDeleteCharacter = (index: number) => {
//     setCharacters(characters.filter((_, i) => i !== index));
//   };
// 
//   // Generate the story prompt using selected genre, tone, and characters
//   const generateStoryPrompt = () => {
//     const characterDescriptions = characters
//       .map(char => `${char.name} - ${char.description}, ${char.personality}`)
//       .join("; ");
//     return `Generate a ${state.genre} story in a ${state.tone} tone, using the following characters: ${characterDescriptions}.
//      Write a line that says "### Story ###" and then write the story.
//      Then write a line that says "### Summaries ###" and then provide a summary of each character's role in the story.`;
//   };
// 
//   return (
//     <main className="mx-auto w-full p-24 flex flex-col response-box-input">
//       <div className="p4 m-4">
//         <div className="flex flex-col items-center justify-center space-y-8 text-white">
//           <div className="space-y-2">
//             <h2 className="text-3xl font-bold">Story Telling App</h2>
//             <p className="text-zinc-500 dark:text-zinc-400">
//               Customize the story by selecting the genre, tone, and characters.
//             </p>
//           </div>
// 
//           {/* Genre Selection */}
//           <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
//             <h3 className="text-xl font-semibold">Genre</h3>
//             <div className="flex flex-wrap justify-center">
//               {genres.map(({ value, emoji }) => (
//                 <div key={value} className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
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
//           {/* Tone Selection */}
//           <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
//             <h3 className="text-xl font-semibold">Tones</h3>
//             <div className="flex flex-wrap justify-center">
//               {tones.map(({ value, emoji }) => (
//                 <div key={value} className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
//                   <input
//                     id={value}
//                     type="radio"
//                     name="tone"
//                     value={value}
//                     onChange={handleChange}
//                   />
//                   <label className="ml-2" htmlFor={value}>
//                   {`${emoji} ${value}`}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
// 
//           {/* Character Management */}
//           <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
//             <h3 className="text-xl font-semibold">Characters</h3>
//             <table className="table-auto w-full text-white border-collapse border border-gray-500">
//               <thead>
//                 <tr className="bg-gray-800">
//                   <th className="border border-gray-600 p-2 text-center">Name</th>
//                   <th className="border border-gray-600 p-2 text-center">Description</th>
//                   <th className="border border-gray-600 p-2 text-center">Personality</th>
//                   <th className="border border-gray-600 p-2 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {characters.map((char, index) => (
//                   <tr key={index} className="text-center">
//                     <td className="border border-gray-600 p-2">{char.name}</td>
//                     <td className="border border-gray-600 p-2">{char.description}</td>
//                     <td className="border border-gray-600 p-2">{char.personality}</td>
//                     <td>
//                       <button
//                         type="button"
//                         className="mr-2 text-blue-400"
//                         onClick={() => handleEditCharacter(index)}>
//                         Edit
//                       </button>
//                       <button
//                         type="button"
//                         className="mr-2 text-blue-400"
//                         onClick={() => handleDeleteCharacter(index)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
// 
//             <div className="mt-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={newCharacter.name}
//                 onChange={e => setNewCharacter({ ...newCharacter, name: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 value={newCharacter.description}
//                 onChange={e => setNewCharacter({ ...newCharacter, description: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Personality"
//                 value={newCharacter.personality}
//                 onChange={e => setNewCharacter({ ...newCharacter, personality: e.target.value })}
//               />
//               <button onClick={handleAddCharacter}>
//                 {editingIndex !== null ? "Save" : "Add"} Character
//               </button>
//             </div>
//           </div>
// 
//           {/* Generate Story Button */}
//           <button
//             type="button"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//             disabled={isLoading || !state.genre || !state.tone || !characters.length}
//             onClick={() =>
//               append({
//                 role: "user",
//                 content: generateStoryPrompt(),
//               })
//             }
//           >
//             Generate Story
//           </button>
// 
//           {/* Display Story and Character Summaries */}
//           {(() => {
//             // Get the latest message content, assuming it's the generated response
//             const responseText = messages[messages.length - 1]?.content || "";
//             console.log("Full Response Text:", responseText); // Logs the full response for debugging
// 
//             // Split the content by story and summaries delimiters
//             const storyText = responseText.split("### Story ###")[1] || "No story generated.";
//             const summaryText = responseText.split("### Summaries ###")[1] || "No summary generated.";
// 
//             return (
//               <div className="output-container">
//                 {/* Separate bubble for the Story */}
//                 <div className="story-bubble mb-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
//                   <h3 className="text-xl font-semibold text-yellow-400">Story</h3>
//                   <p className="mt-2">
//                     {storyText.trim()}
//                   </p>
//                 </div>
// 
//                 {/* Separate bubble for Character Summaries */}
//                 <div className="summary-bubble mt-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
//                   <h3 className="text-xl font-semibold text-yellow-400">Character Summaries</h3>
//                   {summaryText
//                     .split("\n") // Split each line of the summary text
//                     .filter(Boolean) // Remove any empty lines
//                     .map((line, index) => (
//                       <p key={index} className="mt-1">
//                         {line.trim()}
//                       </p>
//                   ))}  
//                 </div>
//               </div>
//             );
//           })()}
// 
//         </div>
//       </div>
//     </main>
//   );
// }

// MikeL's version
// "use client";
// import { useState, useEffect, ChangeEvent } from "react";
// import { Trash2, Edit, Plus, Save } from "lucide-react";
// 
// interface Character {
//   id: string;
//   name: string;
//   description: string;
//   personality: string;
// }
// 
// interface Genre {
//   emoji: string;
//   value: string;
// }
// 
// interface Tone {
//   emoji: string;
//   value: string;
// }
// 
// interface State {
//   genre: string;
//   tone: string;
// }
// 
// const baseCharacters: Character[] = [
//   {
//     id: "1",
//     name: "Mario",
//     description: "A portly Italian plumber who lives in NYC with his brother Luigi",
//     personality: "Mario is a jack of all trades who uses his jumping skills and power-ups to fight his archrival, Bowser"
//   },
//   {
//     id: "2",
//     name: "Speed Racer",
//     description: "A young race car driver known for racing, family, and unique abilities. Drives the Mach 5 with special devices.",
//     personality: "A good guy who is passionate about racing and cars, always willing to risk his life to save others"
//   },
//   {
//     id: "3",
//     name: "Nancy Drew",
//     description: "Former teenage detective drawn back into solving mysteries after a family homicide",
//     personality: "Bright, pretty, and nicer than most people. Curious, independent, and empowering"
//   }
// ];
// 
// export default function Chat() {
//   const [mounted, setMounted] = useState<boolean>(false);
//   const [characters, setCharacters] = useState<Character[]>(baseCharacters);
//   const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [streamedStory, setStreamedStory] = useState<string>("");
//   const [newCharacter, setNewCharacter] = useState<Character>({
//     id: "",
//     name: "",
//     description: "",
//     personality: ""
//   });
//   const [showCharacterForm, setShowCharacterForm] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
// 
//   useEffect(() => {
//     setMounted(true);
//   }, []);
// 
//   const genres: Genre[] = [
//     { emoji: "🧙", value: "Fantasy" },
//     { emoji: "🕵️", value: "Mystery" },
//     { emoji: "💑", value: "Romance" },
//     { emoji: "🚀", value: "Sci-Fi" },
//   ];
// 
//   const tones: Tone[] = [
//     { emoji: "😊", value: "Happy" },
//     { emoji: "😢", value: "Sad" },
//     { emoji: "😏", value: "Sarcastic" },
//     { emoji: "😂", value: "Funny" },
//   ];
// 
//   const [state, setState] = useState<State>({
//     genre: "",
//     tone: "",
//   });
// 
//   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;
//     setState((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
// 
//   const handleCharacterChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
//     const { name, value } = e.target;
//     setNewCharacter(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
// 
//   const addCharacter = (): void => {
//     if (newCharacter.name && newCharacter.description && newCharacter.personality) {
//       setCharacters(prev => [...prev, { ...newCharacter, id: Date.now().toString() }]);
//       setNewCharacter({ id: "", name: "", description: "", personality: "" });
//       setShowCharacterForm(false);
//     }
//   };
// 
//   const deleteCharacter = (id: string): void => {
//     setCharacters(prev => prev.filter(char => char.id !== id));
//   };
// 
//   const startEditing = (character: Character): void => {
//     setEditingCharacter(character);
//     setNewCharacter(character);
//     setShowCharacterForm(true);
//   };
// 
//   const saveEdit = (): void => {
//     setCharacters(prev => 
//       prev.map(char => char.id === editingCharacter?.id ? newCharacter : char)
//     );
//     setEditingCharacter(null);
//     setNewCharacter({ id: "", name: "", description: "", personality: "" });
//     setShowCharacterForm(false);
//   };
// 
//   const generateStoryPrompt = (): string => {
//     const characterDescriptions = characters
//       .map(char => `${char.name}: ${char.description}. Personality: ${char.personality}`)
//       .join("\n");
// 
//     return `Generate a ${state.genre} story in a ${state.tone} tone using these characters:\n${characterDescriptions}\n\nAfter the story, provide a brief summary of each character's role in the story.`;
//   };
// 
//   const cleanTokenizedText = (text: string): string => {
//     return text
//       // Step 1: Remove token patterns and normalize basic spacing
//       .replace(/\d+:"([^"]+)"/g, '$1')
//       .replace(/\s+/g, ' ')
// 
//       // Step 2: Fix incorrectly split words (both within line and across lines)
//       .replace(/([a-zA-Z])\s+(?=[a-zA-Z](?!\w*[A-Z]))/g, '$1')  // Join split words
//       .replace(/([a-zA-Z])\n+([a-zA-Z])/g, '$1$2')  // Join across line breaks
// 
//       // Step 3: Handle proper word boundaries
//       .replace(/([a-z])([A-Z])/g, '$1 $2')  // Add space between camelCase
//       .replace(/([A-Za-z])-\s+([A-Za-z])/g, '$1-$2')  // Fix split hyphenated words
// 
//       // Step 4: Fix punctuation spacing
//       .replace(/\s*([.,!?:;])\s*/g, '$1 ')
//       .replace(/([.,!?:;])\s+([.,!?:;])/g, '$1$2')  // Join multiple punctuation
// 
//       // Step 5: Handle quotes and apostrophes
//       .replace(/"\s+/g, '"')
//       .replace(/\s+"/g, '"')
//       .replace(/'\s+/g, "'")
//       .replace(/\s+'/g, "'")
// 
//       // Step 6: Handle paragraph breaks
//       .replace(/\\n/g, '\n')  // Convert literal \n to newlines
//       .replace(/([.!?])\s*\n/g, '$1\n\n')  // Double line break after sentences
//       .replace(/\n{3,}/g, '\n\n')  // Normalize multiple line breaks
//       .replace(/([^.!?])\n(?!\n)([^.!?])/g, '$1 $2')  // Single newlines become spaces
// 
//       // Step 7: Final cleanup
//       .replace(/\s{2,}/g, ' ')
//       .trim();
//   };
// 
//   const processStreamChunk = (chunk: string, buffer: string): {
//     processedText: string;
//     remainingBuffer: string;
//   } => {
//     // Combine buffer with new chunk
//     const combinedText = buffer + chunk;
// 
//     // Look for complete sentences, including quoted speech
//     const sentences = combinedText.split(/(?<=[.!?])\s+(?=[A-Z"]|\n\n|$)/);
// 
//     // Keep incomplete sentence in buffer
//     let remainingBuffer = sentences.pop() || '';
// 
//     // If buffer gets too large, force process it
//     if (remainingBuffer.length > 1000) {
//       sentences.push(remainingBuffer);
//       remainingBuffer = '';
//     }
// 
//     // Process complete sentences
//     const processedText = sentences.length > 0
//       ? cleanTokenizedText(sentences.join(' ')) + ' '
//       : '';
// 
//     return {
//       processedText,
//       remainingBuffer
//     };
//   };
// 
//   //export { cleanTokenizedText, processStreamChunk };
// 
//   const handleGenerateStory = async (): Promise<void> => {
//     setIsLoading(true);
//     setError("");
//     setStreamedStory("");
// 
//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           messages: [{
//             role: "user",
//             content: generateStoryPrompt(),
//           }],
//         }),
//       });
// 
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
// 
//       const reader = response.body!.getReader();
//       const decoder = new TextDecoder();
//       let buffer = '';
// 
//       while (true) {
//         const { done, value } = await reader.read();
// 
//         if (done) {
//           if (buffer) {
//             const finalText = cleanTokenizedText(buffer);
//             setStreamedStory(prev => prev + finalText);
//           }
//           break;
//         }
// 
//         const chunk = decoder.decode(value, { stream: true });
//         const { processedText, remainingBuffer } = processStreamChunk(chunk, buffer);
// 
//         if (processedText) {
//           setStreamedStory(prev => prev + processedText);
//         }
// 
//         buffer = remainingBuffer;
//       }
//     } catch (err) {
//       console.error("Error generating story:", err);
//       setError("Failed to generate story. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
// 
//   if (!mounted) return null;
// 
//   return (
//     <main className="mx-auto w-full p-24 flex flex-col">
//       <div className="p-4 m-4">
//         <div className="flex flex-col items-center justify-center space-y-8 text-white">
//           <div className="space-y-2">
//             <h2 className="text-3xl font-bold">Story Telling App</h2>
//             <p className="text-zinc-500 dark:text-zinc-400">
//               Customize the story by selecting the genre, tone, and characters.
//             </p>
//           </div>
// 
//           {/* Character Management Section */}
//           <div className="w-full space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-semibold">Characters</h3>
//               <button
//                 onClick={() => setShowCharacterForm(true)}
//                 className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//               >
//                 <Plus size={16} /> Add Character
//               </button>
//             </div>
// 
//             {showCharacterForm && (
//               <div className="space-y-4 bg-opacity-25 bg-gray-600 rounded-lg p-4">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Character Name"
//                   value={newCharacter.name}
//                   onChange={handleCharacterChange}
//                   className="w-full p-2 rounded bg-gray-800 text-white"
//                 />
//                 <textarea
//                   name="description"
//                   placeholder="Character Description"
//                   value={newCharacter.description}
//                   onChange={handleCharacterChange}
//                   className="w-full p-2 rounded bg-gray-800 text-white"
//                 />
//                 <textarea
//                   name="personality"
//                   placeholder="Character Personality"
//                   value={newCharacter.personality}
//                   onChange={handleCharacterChange}
//                   className="w-full p-2 rounded bg-gray-800 text-white"
//                 />
//                 <div className="flex gap-2">
//                   <button
//                     onClick={editingCharacter ? saveEdit : addCharacter}
//                     className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                   >
//                     <Save size={16} /> {editingCharacter ? "Save Edit" : "Add"}
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowCharacterForm(false);
//                       setEditingCharacter(null);
//                       setNewCharacter({ id: "", name: "", description: "", personality: "" });
//                     }}
//                     className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
// 
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {characters.map((character) => (
//                 <div key={character.id} className="bg-opacity-25 bg-gray-600 rounded-lg p-4 space-y-2">
//                   <div className="flex justify-between items-start">
//                     <h4 className="font-semibold">{character.name}</h4>
//                     <div className="flex gap-2">
//                       <button
//                         type="button"
//                         title="Edit Character"
//                         onClick={() => startEditing(character)}
//                         className="text-blue-400 hover:text-blue-300"
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         type="button"
//                         title="Delete Character"
//                         onClick={() => deleteCharacter(character.id)}
//                         className="text-red-400 hover:text-red-300"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-300">{character.description}</p>
//                   <p className="text-sm text-gray-400">{character.personality}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
// 
//           {/* Genre Selection */}
//           <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
//             <h3 className="text-xl font-semibold">Genre</h3>
//             <div className="flex flex-wrap justify-center">
//               {genres.map(({ value, emoji }) => (
//                 <div
//                   key={value}
//                   className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
//                 >
//                   <input
//                     id={`genre-${value}`}
//                     type="radio"
//                     value={value}
//                     name="genre"
//                     checked={state.genre === value}
//                     onChange={handleChange}
//                   />
//                   <label className="ml-2" htmlFor={`genre-${value}`}>
//                     {`${emoji} ${value}`}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
// 
//           {/* Tone Selection */}
//           <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
//             <h3 className="text-xl font-semibold">Tones</h3>
//             <div className="flex flex-wrap justify-center">
//               {tones.map(({ value, emoji }) => (
//                 <div
//                   key={value}
//                   className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
//                 >
//                   <input
//                     id={`tone-${value}`}
//                     type="radio"
//                     name="tone"
//                     value={value}
//                     checked={state.tone === value}
//                     onChange={handleChange}
//                   />
//                   <label className="ml-2" htmlFor={`tone-${value}`}>
//                     {`${emoji} ${value}`}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
// 
//           {/* Generate Story Button */}
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//             disabled={isLoading || !state.genre || !state.tone || characters.length === 0}
//             onClick={handleGenerateStory}
//           >
//             {isLoading ? "Generating..." : "Generate Story"}
//           </button>
// 
//           {/* Error Display */}
//           {error && (
//             <div className="bg-red-500 bg-opacity-25 text-red-100 p-4 rounded-lg w-full">
//               {error}
//             </div>
//           )}
// 
//           {/* Story Display */}
//           {streamedStory && (
//             <div className="bg-opacity-25 bg-gray-700 rounded-lg p-4 w-full">
//               <div className="whitespace-pre-wrap prose prose-invert max-w-none">
//                 {streamedStory}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

// Itsjenn's version
"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();
  const genres = [
    { emoji: "🧙", value: "Fantasy" },
    { emoji: "🕵️", value: "Mystery" },
    { emoji: "💑", value: "Romance" },
    { emoji: "🚀", value: "Sci-Fi" },
  ];
  const tones = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😂", value: "Funny" },
  ];
  const [characters, setCharacters] = useState<{ 
    name: string; 
    description: string; 
    personality: string }[]>([]);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    description: "",
    personality: "",
  });

  const [state, setState] = useState({
    genre: "",
    tone: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleCharacterChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setNewCharacter({
      ...newCharacter,
      [name]: value,
    });
  };

  const addCharacter = () => {
    setCharacters([...characters, newCharacter]);
    setNewCharacter({ name: "", description: "", personality: "" });
  };

  const editCharacter = (index: number, updatedCharacter: { name: string; description: string; personality: string }) => {
    const updatedCharacters = characters.map((character, i) =>
      i === index ? updatedCharacter : character
    );
    setCharacters(updatedCharacters);
  };

  const deleteCharacter = (index: number) => {
    const updatedCharacters = characters.filter((_, i) => i !== index);
    setCharacters(updatedCharacters);
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Story Telling App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the story by creating a character
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 items-center bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Create a character</h3>

            <div className="flex flex-col space-y-4 colourFont">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newCharacter.name}
                onChange={handleCharacterChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={newCharacter.description}
                onChange={handleCharacterChange}
              />
              <input
                type="text"
                name="personality"
                placeholder="Personality"
                value={newCharacter.personality}
                onChange={handleCharacterChange}
              />
            </div>
            <button
              type="button"
              title="Add Character"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded centered"
              onClick={addCharacter}>
              Add Character
            </button>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h2 className="text-xl font-semibold">Characters</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Personality</th>
                  <th>Actions</th>
                </tr>
              </thead>

            <tbody>
              {characters.map((character, index) => (
                <tr key={index}>
                  <td>{character.name}</td>
                  <td>{character.description}</td>
                  <td>{character.personality}</td>
                  <td>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => editCharacter(index, newCharacter)}>
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteCharacter(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>

            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>
              <div className="flex flex-wrap justify-center">
                {tones.map(({ value, emoji }) => (
                  <div
                    key={value}
                    className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                    <input
                      id={value}
                      type="radio"
                      name="tone"
                      value={value}
                      onChange={handleChange}
                    />
                    <label className="ml-2" htmlFor={value}>
                      {`${emoji} ${value}`}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.genre || !state.tone}
            onClick={() =>
              append({
                role: "user",
                content: `Generate a ${state.genre} story in a ${state.tone} tone with the following characters: ${characters
                  .map(
                    (character) =>
                      `${character.name} (Description: ${character.description}, Personality: ${character.personality})`
                  )
                  .join(", ")}`,
              })
            }>
            Generate Story
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4">
            {messages[messages.length - 1]?.content}
          </div>
        </div>
    </main>
  );
}
