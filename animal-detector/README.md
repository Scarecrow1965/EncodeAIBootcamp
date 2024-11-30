# ANIMAL DETECTOR:
The folder is an app for homework assignemnt:
1. Create a new application from scratch using NextJS
2 .Create a page with a single input field for the user to upload an image
-  Ideally, the user would upload a picture of an animal
3. Add a button to upload the image
4. Use a Computer Vision model to detect and classify the animal
-  The model should be able to detect at least 10 different animals of your choice
-  The model should return the name of the animal detected (classification)
5. Create an AI Agent that can find a page in Wikipedia with the name of the animal, retrieve the description, and determine if the animal is dangerous
6. If the uploaded image contains an animal, pass the image to the AI Agent and await the answer
7. Display the answer on the page, indicating whether the animal in the picture is dangerous

# Installation procedure:
## Step 1: Set Up Next.js Project
- Initialize the project:
``` bash
npx create-next-app animal-detector
cd animal-detector
```
- Install necessary dependencies:
  -  Install a library for file uploads:
``` bash
npm install next-connect multer
```
  -  Install ai libraries:
``` bash
npm install ai @ai-sdk/openai openai llamaindex
```
-  Install a computer vision library or API client (e.g., @tensorflow/tfjs for TensorFlow.js or an API client for a service like Google Vision or AWS Rekognition).
-  Install Axios for HTTP requests:
``` bash
npm install axios
```
-  Install the Hugging Face transformers library, so we can use the facebook/:
``` bash
npm install @huggingface/inference
npm install @huggingface/transformers
```
-  ensure all packages are up-to-date in side the package.json file:
``` bash
npm update
```
- reinstall all packages:
``` bash
npm install
```

## Step 2: Build the Upload Page
-  Comment out the code within 'page.tsx'.
-  Add a the information below to it:
```
use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  interface Result {
    name: string;
    isDangerous: boolean;
    description: string;
  }

  const [result, setResult] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image!");
  
    const formData = new FormData();
    formData.append("file", image);
  
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/upload", formData);
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 200 range
          alert(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
          // Request was made but no response received
          alert("Error: No response from server. Please try again later.");
        } else {
          // Something else happened
          alert(`Error: ${error.message}`);
        }
      } else {
        alert(`Error: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Animal Detector</h1>
      <div className="mb-4">
        <label
          className="block text-lg font-medium text-white-700"
          htmlFor="file-upload"
        >
          Upload an image:
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="mt-1 block w-full"
          onChange={handleImageUpload}
        />
      </div>
      <div className="mb-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`px-4 py-2 rounded ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'} text-white`}
        >
          {isLoading ? "Processing..." : "Upload Image"}
        </button>
      </div>
      {result && (
        <div>
          <h2 className="text-xl font-bold mb-2">Result</h2>
          <p>Animal: {result.name}</p>
          <p>Dangerous: {result.isDangerous ? "Yes" : "No"}</p>
          <p>Description: {result.description}</p>
        </div>
      )}
    </div>
  );
}
```
## Step 3: API Route for Classification
-  Create an API route: Create a file 'app/api/route.js'.
-  Set up multer for file handling:
```
import express from 'express';// const express = require('express');
import multer from 'multer';// const multer = require('multer');
import path from 'path';// const path = require('path');
import fs from 'fs';// const fs = require('fs');
import identifyAnimal from './classifier';// const classifyImage = require('./classifier');
import fetchAnimalInfo from './agent';// const fetchAnimalInfo = require('./agent');

const router = express.Router();

// Set up Multer to handle file uploads
const upload = multer({
  dest: 'uploads/', // Temporary folder for uploaded files
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// POST route to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Ensure the file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Full path to the uploaded file
    const imagePath = path.resolve(req.file.path);

    // Classify the image
    const classificationResult = await identifyAnimal(imagePath); // Using `identifyAnimal`

    // Fetch additional info about the detected animal
    const animalInfo = await fetchAnimalInfo(classificationResult.animal); // Using `fetchAnimalInfo`

    // Clean up the uploaded file
    fs.unlinkSync(imagePath);

    // Respond to the client
    res.json({
      success: true,
      detectedAnimal: classificationResult.animal,
      caption: classificationResult.caption,
      animalInfo,
    });
  } catch (error) {
    console.error('Error in route:', error);

    // Clean up the uploaded file in case of an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```
## Step 4: Create Classifier and AI Agent
-  Animal Classifier: In 'app/api/classifier.js', use the Hugging Face facebook/bart-large-mnli model for classification:
```
import { pipeline } from '@xenova/transformers';
import fs from 'fs';
// const { pipeline } = require('@xenova/transformers');
// const fs = require('fs');

async function identifyAnimal(imagePath) {
  try {
    // Load the image-to-text pipeline for generating captions
    const imageCaptioning = await pipeline('image-to-text', 'nlpconnect/vit-gpt2-image-captioning');

    // Read the image file
    const image = fs.readFileSync(imagePath);

    // Generate a caption for the image
    const captionResult = await imageCaptioning(image);

    const caption = captionResult[0]?.generated_text || 'No caption generated';
    console.log(`Generated Caption: ${caption}`);

    // Extract the most probable animal from the caption using regex
    const animalMatch = caption.match(/\b(dog|cat|lion|tiger|elephant|rabbit|eagle|horse|snake|crocodile|giraffe|bear|fox|squirrel|zebra|wolf|penguin|shark|whale|kangaroo|dolphin)\b/i);

    if (animalMatch) {
      const detectedAnimal = animalMatch[0].toLowerCase();
      return {
        animal: detectedAnimal,
        caption: caption,
      };
    } else {
      return {
        animal: 'unknown',
        caption: caption,
      };
    }
  } catch (error) {
    console.error('Error identifying animal:', error);
    throw error;
  }
}

module.exports = identifyAnimal;

```
-  AI Agent: In 'app/api/agent.js', integrate LlamaIndex and use Axios to query Wikipedia and analyze the animal:
```
import axios from 'axios';
// const axios = require('axios');

async function fetchAnimalInfo(animalName) {
  if (animalName === 'unknown') {
    return { title: 'Unknown Animal', description: 'No additional information available.', dangerous: false };
  }

  try {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        titles: animalName,
        prop: 'extracts',
        exintro: true,
        explaintext: true,
      },
    });

    const pages = response.data.query.pages;
    const page = Object.values(pages)[0];

    if (page && page.extract) {
      const description = page.extract.toLowerCase();
      const isDangerous = /dangerous|venomous|aggressive|deadly|carnivore/.test(description);

      return {
        title: page.title,
        description: page.extract,
        dangerous: isDangerous,
      };
    } else {
      return { title: animalName, description: 'No information found.', dangerous: false };
    }
  } catch (error) {
    console.error('Error fetching Wikipedia info:', error);
    throw error;
  }
}

module.exports = fetchAnimalInfo;
```
## Step 5: Update Environment Variables
-  Add your Hugging Face API key to the .env.local file:
``` bash
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

## Step 6: Test and Deploy
-  Run the development server:
``` bash
npm run dev
```
- use the browser of your choice and enter the following into the address bar:
``` bash
http://localhost:3000/
```
-  Upload animal images and test the results.

- Enjoy!
