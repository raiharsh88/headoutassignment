import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import { randomUUID } from 'crypto';
// @ts-ignore: Type declarations for 'form-data' might not be found

// Configuration
const API_ENDPOINT = 'http://localhost:3001/api/v1/timeline'; // Adjust based on your actual API endpoint
const USER_ID = randomUUID(); // Hardcoded userId for demonstration; adjust as needed
const IMAGES_DIR = path.join(__dirname, 'images');

// Function to upload a single image
async function uploadImage(imagePath: string): Promise<void> {
  try {
    const form = new FormData();
    form.append('userId', USER_ID);
    form.append('image', fs.createReadStream(imagePath));
    form.append('caption', 'Test caption');
    const response = await axios.post(API_ENDPOINT, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log(`Successfully uploaded ${path.basename(imagePath)}:`, response.data);
  } catch (error:any) {
    console.error(`Error uploading ${path.basename(imagePath)}:`, error.message);
  }
}

// Function to upload all images in the directory
async function uploadAllImages(): Promise<void> {
  try {
    const files = fs.readdirSync(IMAGES_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    console.log(`Found ${imageFiles.length} images to upload.`);

    for (const file of imageFiles) {
      const imagePath = path.join(IMAGES_DIR, file);
      await uploadImage(imagePath);
    }
  } catch (error:any) {
    console.log(error)
    console.error('Error reading images directory:', error.message);
  }
}

// Main execution
(async () => {
  console.log('Starting image upload process...');
  await uploadAllImages();
  console.log('Image upload process completed.');
})();
