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

  const editCharacter = (index: number, updatedCharacter: any) => {
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

            <div className="flex flex-col space-y-4">
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
