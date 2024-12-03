import sharp from 'sharp';
import identifyAnimal from '../classifier';
import fetchAnimalInfo from '../agent';
import nextConnect from 'next-connect';
import multer from 'multer';

// Set up Multer to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      console.log('req Error:', req);
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
    console.log('req Error:', req);
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res) => {
  try {
    // Ensure the file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Process the image using sharp
    const imageBuffer = await sharp(req.file.buffer)
      .resize(336, 336, {
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      })
      .toFormat('png')
      .toBuffer();
    
    // Convert the image to Base64
    const imageBase64 = imageBuffer.toString('base64');

    // Process the image
    // const inputs = processor(images=imageBuffer, return_tensors="pt").pixel_values.to('cuda');
    // const outputs = await model.get_image_features(inputs);

    // Classify the image
    const classificationResult = await identifyAnimal(imageBuffer); // Using `identifyAnimal` from classifier.js 

    // Fetch additional info about the detected animal
    const animalInfo = await fetchAnimalInfo(classificationResult.animal); // Using `fetchAnimalInfo` from agent.js

    // Respond to the client
    res.json({
      success: true,
      detectedAnimal: classificationResult.animal,
      caption: classificationResult.caption,
      animalInfo,
      image: imageBase64, // Include the Base64-encoded image in the response
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

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, since we're using multer
  },
};
