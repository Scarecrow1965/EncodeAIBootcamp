// Original Code
// import Head from "next/head";
// import { ChangeEvent, useId, useState } from "react";
// 
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { LinkedSlider } from "@/components/ui/linkedslider";
// import { Textarea } from "@/components/ui/textarea";
// import essay from "@/lib/essay";
// 
// const DEFAULT_CHUNK_SIZE = 1024;
// const DEFAULT_CHUNK_OVERLAP = 20;
// const DEFAULT_TOP_K = 2;
// const DEFAULT_TEMPERATURE = 0.1;
// const DEFAULT_TOP_P = 1;
// 
// export default function Home() {
//   const answerId = useId();
//   const queryId = useId();
//   const sourceId = useId();
//   const [text, setText] = useState(essay);
//   const [query, setQuery] = useState("");
//   const [needsNewIndex, setNeedsNewIndex] = useState(true);
//   const [buildingIndex, setBuildingIndex] = useState(false);
//   const [runningQuery, setRunningQuery] = useState(false);
//   const [nodesWithEmbedding, setNodesWithEmbedding] = useState([]);
//   const [chunkSize, setChunkSize] = useState(DEFAULT_CHUNK_SIZE.toString());
//   //^ We're making all of these strings to preserve things like the user typing "0."
//   const [chunkOverlap, setChunkOverlap] = useState(
//     DEFAULT_CHUNK_OVERLAP.toString(),
//   );
//   const [topK, setTopK] = useState(DEFAULT_TOP_K.toString());
//   const [temperature, setTemperature] = useState(
//     DEFAULT_TEMPERATURE.toString(),
//   );
//   const [topP, setTopP] = useState(DEFAULT_TOP_P.toString());
//   const [answer, setAnswer] = useState("");
// 
//   return (
//     <>
//       <Head>
//         <title>LlamaIndex.TS Playground</title>
//       </Head>
//       <main className="mx-2 flex h-full flex-col lg:mx-56">
//         <div className="space-y-2">
//           <Label>Settings:</Label>
//           <div>
//             <LinkedSlider
//               label="Chunk Size:"
//               description={
//                 "The maximum size of the chunks we are searching over, in tokens. " +
//                 "The bigger the chunk, the more likely that the information you are looking " +
//                 "for is in the chunk, but also the more likely that the chunk will contain " +
//                 "irrelevant information."
//               }
//               min={1}
//               max={3000}
//               step={1}
//               value={chunkSize}
//               onChange={(value: string) => {
//                 setChunkSize(value);
//                 setNeedsNewIndex(true);
//               }}
//             />
//           </div>
//           <div>
//             <LinkedSlider
//               label="Chunk Overlap:"
//               description={
//                 "The maximum amount of overlap between chunks, in tokens. " +
//                 "Overlap helps ensure that sufficient contextual information is retained."
//               }
//               min={1}
//               max={600}
//               step={1}
//               value={chunkOverlap}
//               onChange={(value: string) => {
//                 setChunkOverlap(value);
//                 setNeedsNewIndex(true);
//               }}
//             />
//           </div>
//         </div>
//         <div className="my-2 flex h-3/4 flex-auto flex-col space-y-2">
//           <Label htmlFor={sourceId}>Upload source text file:</Label>
//           <Input 
//           id={sourceId}
//             type="file"
//             accept=".txt"
//             onChange={(e: ChangeEvent<HTMLInputElement>) => {
//               const file = e.target.files?.[0];
//               if (file) {
//                 const reader = new FileReader();
//                 reader.onload = (event) => {
//                   const fileContent = event.target?.result as string;
//                   setText(fileContent);
//                   setNeedsNewIndex(true);
//                 };
//                 if (file.type != "text/plain") {
//                   console.error(`${file.type} parsing not implemented`);
//                   setText("Error");
//                 } else {
//                   reader.readAsText(file);
//                 }
//               }
//             }}
//           />
//         </div>
// 
//         <Button
//           disabled={!needsNewIndex || buildingIndex || runningQuery}
//           onClick={async () => {
//             setAnswer("Building index...");
//             setBuildingIndex(true);
//             setNeedsNewIndex(false);
//             // Post the text and settings to the server
//             const result = await fetch("/api/splitandembed", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 document: text,
//                 chunkSize: parseInt(chunkSize),
//                 chunkOverlap: parseInt(chunkOverlap),
//               }),
//             });
//             const { error, payload } = await result.json();
// 
//             if (error) {
//               setAnswer(error);
//             }
// 
//             if (payload) {
//               setNodesWithEmbedding(payload.nodesWithEmbedding);
//               setAnswer("Index built!");
//             }
// 
//             setBuildingIndex(false);
//           }}
//         >
//           {buildingIndex ? "Building Vector index..." : "Build index"}
//         </Button>
// 
//         {!buildingIndex && !needsNewIndex && !runningQuery && (
//           <>
//             <LinkedSlider
//               className="my-2"
//               label="Top K:"
//               description={
//                 "The maximum number of chunks to return from the search. " +
//                 "It's called Top K because we are retrieving the K nearest neighbors of the query."
//               }
//               min={1}
//               max={15}
//               step={1}
//               value={topK}
//               onChange={(value: string) => {
//                 setTopK(value);
//               }}
//             />
// 
//             <LinkedSlider
//               className="my-2"
//               label="Temperature:"
//               description={
//                 "Temperature controls the variability of model response. Adjust it " +
//                 "downwards to get more consistent responses, and upwards to get more diversity."
//               }
//               min={0}
//               max={1}
//               step={0.01}
//               value={temperature}
//               onChange={(value: string) => {
//                 setTemperature(value);
//               }}
//             />
// 
//             <LinkedSlider
//               className="my-2"
//               label="Top P:"
//               description={
//                 "Top P is another way to control the variability of the model " +
//                 "response. It filters out low probability options for the model. It's " +
//                 "recommended by OpenAI to set temperature to 1 if you're adjusting " +
//                 "the top P."
//               }
//               min={0}
//               max={1}
//               step={0.01}
//               value={topP}
//               onChange={(value: string) => {
//                 setTopP(value);
//               }}
//             />
// 
//             <div className="my-2 space-y-2">
//               <Label htmlFor={queryId}>Query:</Label>
//               <div className="flex w-full space-x-2">
//                 <Input
//                   id={queryId}
//                   value={query}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                     setQuery(e.target.value);
//                   }}
//                 />
//                 <Button
//                   type="submit"
//                   disabled={needsNewIndex || buildingIndex || runningQuery}
//                   onClick={async () => {
//                     setAnswer("Running query...");
//                     setRunningQuery(true);
//                     // Post the query and nodesWithEmbedding to the server
//                     const result = await fetch("/api/retrieveandquery", {
//                       method: "POST",
//                       headers: {
//                         "Content-Type": "application/json",
//                       },
//                       body: JSON.stringify({
//                         query,
//                         nodesWithEmbedding,
//                         topK: parseInt(topK),
//                         temperature: parseFloat(temperature),
//                         topP: parseFloat(topP),
//                       }),
//                     });
// 
//                     const { error, payload } = await result.json();
// 
//                     if (error) {
//                       setAnswer(error);
//                     }
// 
//                     if (payload) {
//                       setAnswer(payload.response);
//                     }
// 
//                     setRunningQuery(false);
//                   }}
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </div>
//             <div className="my-2 flex h-1/4 flex-auto flex-col space-y-2">
//               <Label htmlFor={answerId}>Answer:</Label>
//               <Textarea
//                 className="flex-1"
//                 readOnly
//                 value={answer}
//                 id={answerId}
//               />
//             </div>
//           </>
//         )}
//       </main>
//     </>
//   );
// }

// Scarecrow1965 code
import Head from "next/head";
import { useState, useId, ChangeEvent, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkedSlider } from "@/components/ui/linkedslider";
import { Textarea } from "@/components/ui/textarea";

const DEFAULT_CHUNK_SIZE = 1024;
const DEFAULT_CHUNK_OVERLAP = 20;
const DEFAULT_TOP_K = 2;
const DEFAULT_TEMPERATURE = 0.1;
const DEFAULT_TOP_P = 1;

export default function Home() {
  const answerId = useId();
  // const queryId = useId();
  const sourceId = useId();
  // const [text, setText] = useState("");
  // const [query, setQuery] = useState("List the name, description, and personality of every character.");
  const [needsNewIndex, setNeedsNewIndex] = useState(true);
  const [buildingIndex, setBuildingIndex] = useState(false);
  const [runningQuery, setRunningQuery] = useState(false);
  const [nodesWithEmbedding, setNodesWithEmbedding] = useState([]);

  const [chunkSize, setChunkSize] = useState(DEFAULT_CHUNK_SIZE.toString());
  //^ We're making all of these strings to preserve things like the user typing "0."
  const [chunkOverlap, setChunkOverlap] = useState(DEFAULT_CHUNK_OVERLAP.toString(),);
  const [topK, setTopK] = useState(DEFAULT_TOP_K.toString());
  const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE.toString(),);
  const [topP, setTopP] = useState(DEFAULT_TOP_P.toString());

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [answer, setAnswer] = useState("");
  const [characters, setCharacters] = useState<{ name: string; description: string; personality: string }[]>([]);

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        console.log("File content:", text); // Add logging to verify file content
        setFileContent(text);
        setNeedsNewIndex(true);
      };
      if (file.type != "text/plain") {
        console.error(`${file.type} parsing not implemented`);
        setFileContent("Error");
      } else {
        reader.readAsText(file);
      }
    }
  };

  const extractCharacters = async () => {
    setBuildingIndex(true);
    setRunningQuery(true);
    setAnswer("Building index and running query...");

    try {
      // Step 1: Build the index
      const indexResult = await fetch("/api/splitandembed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document: fileContent,
          chunkSize: parseInt(chunkSize),
          chunkOverlap: parseInt(chunkOverlap),
        }),
      });
      const indexData = await indexResult.json();

      if (indexData.error) {
        console.error(indexData.error);
        setBuildingIndex(false);
        setRunningQuery(false);
        setAnswer("Error building index");
        return;
      }

      setNodesWithEmbedding(indexData.payload.nodesWithEmbedding);

      // Automatically set the query value
      const query = "List the name, description, and personality of every character.";

      // Step 2: Run the query
      const queryResult = await fetch("/api/retrieveandquery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          nodesWithEmbedding: indexData.payload.nodesWithEmbedding,
          topK: parseInt(topK),
          temperature: parseFloat(temperature),
          topP: parseFloat(topP),
        }),
      });

      const queryData = await queryResult.json();

      if (queryData.error) {
        setAnswer(queryData.error);
      } else {
        setAnswer(queryData.payload.response);
        // setAnswer(JSON.stringify(queryData.payload.response, null, 2)); // Display raw response in Textarea
        console.log("Query response from extractCharacter:", queryData.payload.response); // Log the response
        
        // Parse the response string into an array of character objects
        const parsedCharacters = parseCharacters(queryData.payload.response);
        setCharacters(parsedCharacters);
        console.log("Characters set from extractCharacter:", parsedCharacters); // Log the characters
      }

      setBuildingIndex(false);
      setRunningQuery(false);
      setNeedsNewIndex(false);
    } catch (error) {
      console.error("Error extracting characters:", error);
      setAnswer("Error extracting characters");
      setBuildingIndex(false);
      setRunningQuery(false);
    }
  };

  // Function to parse the response string into an array of character objects
  const parseCharacters = (response: string): { name: string; description: string; personality: string }[] => {
    const characterRegex = /\d+\.\s+([^:]+):\s+([^\.]+)\.\s+([^\.]+)\./g;
    const characters = [];
    let match;
    while ((match = characterRegex.exec(response)) !== null) {
      characters.push({
        name: match[1].trim(),
        description: match[2].trim(),
        personality: match[3].trim(),
      });
    }
    return characters;
  };

  // Function to reset the webpage and data
  const resetPage = () => {
    setNeedsNewIndex(true);
    setBuildingIndex(false);
    setRunningQuery(false);
    setNodesWithEmbedding([]);
    setFileContent("");
    setAnswer("");
    setCharacters([]);
  };

  // Function to render the table
  const renderTable = () => (
    <div className="my-2 flex h-3/4 flex-auto flex-col space-y-2">
      <Label>Extracted Characters:</Label>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personality</th>
          </tr>
        </thead>
        <tbody className="bg-black divide-y divide-gray-200">
          {characters.map((char, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{char.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{char.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{char.personality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Head>
        <title>Story Character Extractor</title>
      </Head>
      <main className="flex flex-col h-full space-y-2">
        <header>
          <h1>Story Character Extractor</h1>
        </header>
        <div className="flex-1 space-y-2">
          <Label>Settings:</Label>
          <div>
            <LinkedSlider
              label="Chunk Size:"
              description={
                "The maximum size of the chunks we are searching over, in tokens. " +
                "The bigger the chunk, the more likely that the information you are looking " +
                "for is in the chunk, but also the more likely that the chunk will contain " +
                "irrelevant information."
              }
              min={1}
              max={3000}
              step={1}
              value={chunkSize}
              onChange={(value: string) => {
                setChunkSize(value);
                setNeedsNewIndex(true);
              }}
            />
          </div>
          <div>
            <LinkedSlider
              label="Chunk Overlap:"
              description={
                "The maximum amount of overlap between chunks, in tokens. " +
                "Overlap helps ensure that sufficient contextual information is retained."
              }
              min={1}
              max={600}
              step={1}
              value={chunkOverlap}
              onChange={(value: string) => {
                setChunkOverlap(value);
                setNeedsNewIndex(true);
              }}
            />
          </div>
          <div>
            <LinkedSlider
              className="my-2"
              label="Top K:"
              description={
                "The maximum number of chunks to return from the search. " +
                "It's called Top K because we are retrieving the K nearest neighbors of the query."
              }
              min={1}
              max={15}
              step={1}
              value={topK}
              onChange={(value: string) => {
                setTopK(value);
              }}
            />
          </div>
          <div>
            <LinkedSlider
              className="my-2"
              label="Temperature:"
              description={
                "Temperature controls the variability of model response. Adjust it " +
                "downwards to get more consistent responses, and upwards to get more diversity."
              }
              min={0}
              max={1}
              step={0.01}
              value={temperature}
              onChange={(value: string) => {
                setTemperature(value);
              }}
            />
          </div>
          <div>
            <LinkedSlider
              className="my-2"
              label="Top P:"
              description={
                "Top P is another way to control the variability of the model " +
                "response. It filters out low probability options for the model. It's " +
                "recommended by OpenAI to set temperature to 1 if you're adjusting " +
                "the top P."
              }
              min={0}
              max={1}
              step={0.01}
              value={topP}
              onChange={(value: string) => {
                setTopP(value);
              }}
            />
          </div>
        </div>

        <div className="my-2 flex-auto flex-col">
          <h1>Upload a Book/Story/etc to Extract Character information.</h1>
          <h2> This file <b>MUST</b> be in a .txt format</h2>
          <Label hidden htmlFor={sourceId}>Upload source text file:</Label>
          <p>&nbsp;</p>
          <div className="my-2 flex-auto">
            {!fileContent && (
            <Button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => fileInputRef.current?.click()}
            >
            Browse
            </Button>
            )}
            <Input 
              id={sourceId}
              type="file"
              accept=".txt"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
          <div className="mx-2 flex h-3/4 flex-col flex-auto">
            <Textarea
              id={sourceId}
              value={fileContent}
              readOnly
              placeholder="Uploaded file content will appear here"
              className="flex-1"
              style={{ maxHeight: '200px', overflow: 'auto' }}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setFileContent(e.target.value);
                setNeedsNewIndex(true);
              }}
            />
          </div>
        </div>
        <div className="my-2 flex-auto">
        { needsNewIndex && (
          <Button
            disabled={ buildingIndex || runningQuery }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={extractCharacters}
          >
            {buildingIndex ? "Getting Character Information..." : "Get Character Information"}
          </Button>
        )}
        </div>
        { !needsNewIndex && (
          <>
            {/* <div className="my-2 flex h-1/4 flex-auto flex-col space-y-2">
              <Label htmlFor={answerId}>Answer:</Label>
              <Textarea
                className="flex-1"
                value={answer}
                readOnly
                rows={10}
                style={{ maxHeight: '200px', overflow: 'auto' }}
              />
            </div> */}
            {renderTable()}            
          </>
        )}
        <div className="my-2 flex-auto">
          <Button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetPage}>Reset</Button>
        </div>
      </main>
    </>
  );
}