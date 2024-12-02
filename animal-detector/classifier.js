// import { pipeline } from '@xenova/transformers';
// import fs from 'fs';
// // const { pipeline } = require('@xenova/transformers');
// // const fs = require('fs');

// async function identifyAnimal(imagePath) {
//   try {

//     const formData = new FormData();
//     formData.append('image', imageFile);
//     await fetch('/api/classify', {
//       method: 'POST',
//       body: formData
//     });

//     // Load the image-to-text pipeline for generating captions
//     const imageCaptioning = await pipeline('image-to-text', 'nlpconnect/vit-gpt2-image-captioning');

//     // Read the image file
//     const image = fs.readFileSync(imagePath);

//     // Generate a caption for the image
//     const captionResult = await imageCaptioning(image);

//     const caption = captionResult[0]?.generated_text || 'No caption generated';
//     console.log(`Generated Caption: ${caption}`);

//     // Extract the most probable animal from the caption using regex
//     const animalMatch = caption.match(/\b(dog|cat|lion|tiger|elephant|rabbit|eagle|horse|snake|crocodile|giraffe|bear|fox|squirrel|zebra|wolf|penguin|shark|whale|kangaroo|dolphin)\b/i);

//     if (animalMatch) {
//       const detectedAnimal = animalMatch[0].toLowerCase();
//       return {
//         animal: detectedAnimal,
//         caption: caption,
//       };
//     } else {
//       return {
//         animal: 'unknown',
//         caption: caption,
//       };
//     }
//   } catch (error) {
//     console.error('Error identifying animal:', error);
//     throw error;
//   }
// }

// module.exports = identifyAnimal;

import { CLIPProcessor, CLIPModel } from '@huggingface/transformers';
import sharp from 'sharp';

async function identifyAnimal(imageBuffer) {
// Load the processor and model
const processor = await CLIPProcessor.from_pretrained('openai/clip-vit-large-patch14-336');
const model = await CLIPModel.from_pretrained('microsoft/LLM2CLIP-Llama-3-8B-Instruct-CC-Finetuned');

// Process the image buffer
const image = await sharp(imageBuffer)
  .resize(224, 224)
  .toFormat('png')
  .toBuffer();

const inputs = processor(images=image, return_tensors="pt").pixel_values.to('cuda');
const outputs = await model.get_image_features(inputs);

// Assuming you have a method to classify the image features
const detectedAnimal = classifyImageFeatures(outputs);

// Generate a caption for the image (if needed)
const caption = `This is a ${detectedAnimal}.`;

return {
  animal: detectedAnimal,
  caption: caption,
};
}

// Dummy function to classify image features (replace with actual implementation)
async function classifyImageFeatures() {
  // Implement your classification logic here
  // Generate a caption for the image
  const captionResult = await model.generate_caption(inputs);
  // Generate a caption for the image (if needed)
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
}

export default identifyAnimal;
