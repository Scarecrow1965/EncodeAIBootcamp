"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Trash2, Edit, Plus, Save } from "lucide-react";

interface Character {
  id: string;
  name: string;
  description: string;
  personality: string;
}

interface Genre {
  emoji: string;
  value: string;
}

interface Tone {
  emoji: string;
  value: string;
}

interface State {
  genre: string;
  tone: string;
}

const baseCharacters: Character[] = [
  {
    id: "1",
    name: "Mario",
    description: "A portly Italian plumber who lives in NYC with his brother Luigi",
    personality: "Mario is a jack of all trades who uses his jumping skills and power-ups to fight his archrival, Bowser"
  },
  {
    id: "2",
    name: "Speed Racer",
    description: "A young race car driver known for racing, family, and unique abilities. Drives the Mach 5 with special devices.",
    personality: "A good guy who is passionate about racing and cars, always willing to risk his life to save others"
  },
  {
    id: "3",
    name: "Nancy Drew",
    description: "Former teenage detective drawn back into solving mysteries after a family homicide",
    personality: "Bright, pretty, and nicer than most people. Curious, independent, and empowering"
  }
];

export default function Chat() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>(baseCharacters);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streamedStory, setStreamedStory] = useState<string>("");
  const [newCharacter, setNewCharacter] = useState<Character>({
    id: "",
    name: "",
    description: "",
    personality: ""
  });
  const [showCharacterForm, setShowCharacterForm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const genres: Genre[] = [
    { emoji: "🧙", value: "Fantasy" },
    { emoji: "🕵️", value: "Mystery" },
    { emoji: "💑", value: "Romance" },
    { emoji: "🚀", value: "Sci-Fi" },
  ];

  const tones: Tone[] = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😂", value: "Funny" },
  ];

  const [state, setState] = useState<State>({
    genre: "",
    tone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCharacterChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNewCharacter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCharacter = (): void => {
    if (newCharacter.name && newCharacter.description && newCharacter.personality) {
      setCharacters(prev => [...prev, { ...newCharacter, id: Date.now().toString() }]);
      setNewCharacter({ id: "", name: "", description: "", personality: "" });
      setShowCharacterForm(false);
    }
  };

  const deleteCharacter = (id: string): void => {
    setCharacters(prev => prev.filter(char => char.id !== id));
  };

  const startEditing = (character: Character): void => {
    setEditingCharacter(character);
    setNewCharacter(character);
    setShowCharacterForm(true);
  };

  const saveEdit = (): void => {
    setCharacters(prev => 
      prev.map(char => char.id === editingCharacter?.id ? newCharacter : char)
    );
    setEditingCharacter(null);
    setNewCharacter({ id: "", name: "", description: "", personality: "" });
    setShowCharacterForm(false);
  };

  const generateStoryPrompt = (): string => {
    const characterDescriptions = characters
      .map(char => `${char.name}: ${char.description}. Personality: ${char.personality}`)
      .join("\n");
    
    return `Generate a ${state.genre} story in a ${state.tone} tone using these characters:\n${characterDescriptions}\n\nAfter the story, provide a brief summary of each character's role in the story.`;
  };

  const cleanTokenizedText = (text: string): string => {
    return text
      // Step 1: Remove token patterns and normalize basic spacing
      .replace(/\d+:"([^"]+)"/g, '$1')
      .replace(/\s+/g, ' ')
  
      // Step 2: Fix incorrectly split words (both within line and across lines)
      .replace(/([a-zA-Z])\s+(?=[a-zA-Z](?!\w*[A-Z]))/g, '$1')  // Join split words
      .replace(/([a-zA-Z])\n+([a-zA-Z])/g, '$1$2')  // Join across line breaks
      
      // Step 3: Handle proper word boundaries
      .replace(/([a-z])([A-Z])/g, '$1 $2')  // Add space between camelCase
      .replace(/([A-Za-z])-\s+([A-Za-z])/g, '$1-$2')  // Fix split hyphenated words
      
      // Step 4: Fix punctuation spacing
      .replace(/\s*([.,!?:;])\s*/g, '$1 ')
      .replace(/([.,!?:;])\s+([.,!?:;])/g, '$1$2')  // Join multiple punctuation
      
      // Step 5: Handle quotes and apostrophes
      .replace(/"\s+/g, '"')
      .replace(/\s+"/g, '"')
      .replace(/'\s+/g, "'")
      .replace(/\s+'/g, "'")
      
      // Step 6: Handle paragraph breaks
      .replace(/\\n/g, '\n')  // Convert literal \n to newlines
      .replace(/([.!?])\s*\n/g, '$1\n\n')  // Double line break after sentences
      .replace(/\n{3,}/g, '\n\n')  // Normalize multiple line breaks
      .replace(/([^.!?])\n(?!\n)([^.!?])/g, '$1 $2')  // Single newlines become spaces
      
      // Step 7: Final cleanup
      .replace(/\s{2,}/g, ' ')
      .trim();
  };
  
  const processStreamChunk = (chunk: string, buffer: string): {
    processedText: string;
    remainingBuffer: string;
  } => {
    // Combine buffer with new chunk
    const combinedText = buffer + chunk;
    
    // Look for complete sentences, including quoted speech
    const sentences = combinedText.split(/(?<=[.!?])\s+(?=[A-Z"]|\n\n|$)/);
    
    // Keep incomplete sentence in buffer
    let remainingBuffer = sentences.pop() || '';
    
    // If buffer gets too large, force process it
    if (remainingBuffer.length > 1000) {
      sentences.push(remainingBuffer);
      remainingBuffer = '';
    }
    
    // Process complete sentences
    const processedText = sentences.length > 0
      ? cleanTokenizedText(sentences.join(' ')) + ' '
      : '';
      
    return {
      processedText,
      remainingBuffer
    };
  };
  
  //export { cleanTokenizedText, processStreamChunk };
  
  const handleGenerateStory = async (): Promise<void> => {
    setIsLoading(true);
    setError("");
    setStreamedStory("");
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: generateStoryPrompt(),
          }],
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
  
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          if (buffer) {
            const finalText = cleanTokenizedText(buffer);
            setStreamedStory(prev => prev + finalText);
          }
          break;
        }
  
        const chunk = decoder.decode(value, { stream: true });
        const { processedText, remainingBuffer } = processStreamChunk(chunk, buffer);
        
        if (processedText) {
          setStreamedStory(prev => prev + processedText);
        }
        
        buffer = remainingBuffer;
      }
    } catch (err) {
      console.error("Error generating story:", err);
      setError("Failed to generate story. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  if (!mounted) return null;

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p-4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Story Telling App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the story by selecting the genre, tone, and characters.
            </p>
          </div>

          {/* Character Management Section */}
          <div className="w-full space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Characters</h3>
              <button
                onClick={() => setShowCharacterForm(true)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                <Plus size={16} /> Add Character
              </button>
            </div>

            {showCharacterForm && (
              <div className="space-y-4 bg-opacity-25 bg-gray-600 rounded-lg p-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Character Name"
                  value={newCharacter.name}
                  onChange={handleCharacterChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <textarea
                  name="description"
                  placeholder="Character Description"
                  value={newCharacter.description}
                  onChange={handleCharacterChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <textarea
                  name="personality"
                  placeholder="Character Personality"
                  value={newCharacter.personality}
                  onChange={handleCharacterChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <div className="flex gap-2">
                  <button
                    onClick={editingCharacter ? saveEdit : addCharacter}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    <Save size={16} /> {editingCharacter ? "Save Edit" : "Add"}
                  </button>
                  <button
                    onClick={() => {
                      setShowCharacterForm(false);
                      setEditingCharacter(null);
                      setNewCharacter({ id: "", name: "", description: "", personality: "" });
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map((character) => (
                <div key={character.id} className="bg-opacity-25 bg-gray-600 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{character.name}</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(character)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteCharacter(character.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{character.description}</p>
                  <p className="text-sm text-gray-400">{character.personality}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Genre Selection */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>
            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={`genre-${value}`}
                    type="radio"
                    value={value}
                    name="genre"
                    checked={state.genre === value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={`genre-${value}`}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>
            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={`tone-${value}`}
                    type="radio"
                    name="tone"
                    value={value}
                    checked={state.tone === value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={`tone-${value}`}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Story Button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.genre || !state.tone || characters.length === 0}
            onClick={handleGenerateStory}
          >
            {isLoading ? "Generating..." : "Generate Story"}
          </button>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500 bg-opacity-25 text-red-100 p-4 rounded-lg w-full">
              {error}
            </div>
          )}

          {/* Story Display */}
          {streamedStory && (
            <div className="bg-opacity-25 bg-gray-700 rounded-lg p-4 w-full">
              <div className="whitespace-pre-wrap prose prose-invert max-w-none">
                {streamedStory}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}