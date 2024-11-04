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

// multi-modal example
// "use client";

// import { useChat } from "ai/react";
// import { useState, useRef } from "react";

// export default function Chat() {
  
//   const { messages, input, handleInputChange, handleSubmit } = useChat();
//   const [files, setFiles] = useState<FileList | undefined>(undefined);
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   return (
//     <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
//       {messages.map((m) => (
//         <div key={m.id} className="whitespace-pre-wrap">
//           {m.role === "user" ? "User: " : "AI: "}
//           {m.content}
//           <div>
//             {m?.experimental_attachments
//               ?.filter((attachment) => attachment?.contentType?.startsWith("image/"))
//               .map((attachment, index) => (
//                 <img
//                   key={`${m.id}-${index}`}
//                   src={attachment.url}
//                   width={500}
//                   alt={attachment.name}
//                 />
//             ))}
//           </div>
//         </div>
        
//       ))}

//       <form
//         className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl space-y-2"
//         onSubmit={(event) => {
//           handleSubmit(event, {
//           experimental_attachments: files,
//           });

//           setFiles(undefined);

//           if (fileInputRef.current) {
//             fileInputRef.current.value = "";
//           }
//         }}
//       >
//         <label htmlFor="file-upload" className="sr-only">Upload files</label>
//         <input
//           id="file-upload"
//           type="file"
//           className=""
//           onChange={(event) => {
//             if (event.target.files) {
//               setFiles(event.target.files);
//             }
//           }}
//           multiple
//           placeholder="Choose files to upload"
//           ref={fileInputRef}
//         />
//         <input
//           className="w-full p-2 text-black"
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }

// Story-telling.md
// "use client";
// 
// import { useState } from "react";
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

// Scarecrow1965 new code
"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();

  const topics = [
    { value: "Work" },
    { value: "People" },
    { value: "Animals" },
    { value: "Food" },
    { value: "Television" },
  ];

  const tones = [
    { value: "Witty" },
    { value: "Sarcastic" },
    { value: "Silly" },
    { value: "Dark" },
    { value: "Goofy" },
  ];

  const types = [
    { value: "Pun" },
    { value: "Knock-Knock" },
    { value: "Story" },
    { value: "One-line" },
    { value: "Satire" },
  ];

  const temperature = [ 
    {value: "0.2"},
    {value: "0.3"},
    {value: "0.4"},
    {value: "0.5"},
    {value: "0.6"},
    {value: "0.7"},
    {value: "0.8"},
    {value: "0.9"},
    {value: "1.0"},
  ];

  // const subjective = [
  //   {value: "Funny"},
  //   {value: "Appropriate"},
  //   {value: "Offensive"},
  //   {value: "Creative"},
  //   {value: "Original"},
  // ];

  const [state, setState] = useState({
    topic: "",
    tone: "",
    type: "",
    temperature: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const generateJoke = async () => {
    try {
      console.log("Sending request with state:", state);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error("Failed to generate joke");
      }

      const data = await response.json();
      console.log("Received response:", data);

      // Append joke and evaluation as separate messages
      append({ role: "assistant", content: `Joke: ${data.joke} \n\nEvaluation: ${data.evaluation}` });
    } catch (error) {
      console.error("Error generating joke:", error);
      append({ role: "assistant", content: "Error generating joke. Please try again." });
    }
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white response-box2"
        // used className = "response-box2" for testing purposes only
        > 
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Joke of the Day</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize a joke by selecting the genre, tone, type and see how creative OpenAI can be.
            </p>
          </div>

          {/* TOPICS */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Topics</h3>
            <div className="flex flex-wrap justify-center">
              {topics.map(({value}) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="topic"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* TONES */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>
            <div className="flex flex-wrap justify-center">
              {tones.map(({value}) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* TYPES */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Types</h3>
            <div className="flex flex-wrap justify-center">
              {types.map(({value}) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="type"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* TEMPERATURE */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Temperatures</h3>
            <div className="flex flex-wrap justify-center">
              {temperature.map(({value}) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="temperature"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.topic || !state.tone || !state.type || !state.temperature}
            onClick={generateJoke}
          >
            Generate Joke
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4 response-box1"
            // used className = "response-box1" for testing purposes only
          >
            {/* Separate joke and evaluation with paragraphs */}
            <p>Joke: {messages[messages.length - 1]?.content.split("Evaluation: ")[0].replace("Joke: ", "")}</p>
            <p>Evaluation: {messages[messages.length - 1]?.content.split("Evaluation: ")[1]}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

// MLittle new code
// 'use client';
// 
// import { useState } from 'react';
// import { Analytics } from '@vercel/analytics/react';
// 
// const topics = ['work', 'people', 'animals', 'food', 'television', 'weather'];
// const tones = ['witty', 'sarcastic', 'silly', 'dark', 'goofy', 'dad'];
// const jokeTypes = ['pun', 'knock-knock', 'story'];
// 
// export default function Home() {
//   const [joke, setJoke] = useState('');
//   const [evaluation, setEvaluation] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [evaluating, setEvaluating] = useState(false);
//   const [selectedTopic, setSelectedTopic] = useState(topics[0]);
//   const [selectedTone, setSelectedTone] = useState(tones[0]);
//   const [selectedType, setSelectedType] = useState(jokeTypes[0]);
//   const [temperature, setTemperature] = useState(0.7);
// 
//   // Store the parameters used to generate the current joke
//   const [currentJokeParams, setCurrentJokeParams] = useState({
//     topic: topics[0],
//     tone: tones[0],
//     type: jokeTypes[0]
//   });
// 
//   const generateJoke = async () => {
//     setLoading(true);
//     // Clear evaluation when generating new joke
//     setEvaluation('');
// 
//     try {
//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           topic: selectedTopic,
//           tone: selectedTone,
//           type: selectedType,
//           temperature: temperature,
//         }),
//       });
//       const data = await response.json();
//       setJoke(data.joke);
//       // Store the parameters used for this joke
//       setCurrentJokeParams({
//         topic: selectedTopic,
//         tone: selectedTone,
//         type: selectedType
//       });
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     setLoading(false);
//   };
// 
//   const evaluateJoke = async () => {
//     if (!joke) return;
// 
//     setEvaluating(true);
//     try {
//       const response = await fetch('/api/evaluate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           joke,
//           // Pass the parameters that were used to generate this joke
//           ...currentJokeParams
//         }),
//       });
//       const data = await response.json();
//       setEvaluation(data.evaluation);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     setEvaluating(false);
//   };
// 
//   const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTemperature = parseFloat(e.target.value);
//     setTemperature(newTemperature);
//   };
// 
//   return (
//     <main className="min-h-screen p-8 max-w-2xl mx-auto">
//       <h1 className="text-4xl font-bold mb-8 text-center">AI Joke Generator</h1>
// 
//       <div className="space-y-6">
//         <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Topic
//             </label>
//             <label htmlFor="topic-select" className="block text-sm font-medium text-gray-700 mb-2">
//               Topic
//             </label>
//             <select
//               id="topic-select"
//               value={selectedTopic}
//               onChange={(e) => setSelectedTopic(e.target.value)}
//               className="w-full p-2 border rounded-md"
//             >
//               {topics.map((topic) => (
//                 <option key={topic} value={topic}>
//                   {topic.charAt(0).toUpperCase() + topic.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>
// 
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Tone
//             </label>
//             <label htmlFor="tone-select" className="block text-sm font-medium text-gray-700 mb-2">
//               Tone
//             </label>
//             <select
//               id="tone-select"
//               value={selectedTone}
//               onChange={(e) => setSelectedTone(e.target.value)}
//               className="w-full p-2 border rounded-md"
//             >
//               {tones.map((tone) => (
//                 <option key={tone} value={tone}>
//                   {tone.charAt(0).toUpperCase() + tone.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>
// 
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Type
//             </label>
//             <label htmlFor="type-select" className="block text-sm font-medium text-gray-700 mb-2">
//               Type
//             </label>
//             <select
//               id="type-select"
//               value={selectedType}
//               onChange={(e) => setSelectedType(e.target.value)}
//               className="w-full p-2 border rounded-md"
//             >
//               {jokeTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>
// 
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Temperature: {temperature.toFixed(1)}
//             </label>
//             <input
//               type="range"
//               min="0"
//               max="2"
//               step="0.1"
//               value={temperature}
//               onChange={handleTemperatureChange}
//               className="w-full"
//               placeholder = "what temperature do you want?"
//             />
//             <div className="flex justify-between text-xs text-gray-500">
//               <span>Conservative</span>
//               <span>Creative</span>
//             </div>
//           </div>
//         </div>
// 
//         <button
//           onClick={generateJoke}
//           disabled={loading}
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//         >
//           {loading ? 'Generating...' : 'Generate Joke'}
//         </button>
// 
//         {joke && (
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <h2 className="font-bold mb-2">Generated Joke:</h2>
//             <p className="text-lg">{joke}</p>
//             <div className="mt-2 text-sm text-gray-600">
//               <p>Topic: {currentJokeParams.topic}</p>
//               <p>Tone: {currentJokeParams.tone}</p>
//               <p>Type: {currentJokeParams.type}</p>
//             </div>
//           </div>
//         )}
// 
//         {joke && (
//           <div className="space-y-4">
//             <button
//               onClick={evaluateJoke}
//               disabled={evaluating}
//               className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//             >
//               {evaluating ? 'Evaluating...' : 'Evaluate Joke'}
//             </button>
// 
//             {evaluation && (
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <h2 className="font-bold mb-2">Evaluation:</h2>
//                 <p>{evaluation}</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       <Analytics />
//     </main>
//   );
// }
