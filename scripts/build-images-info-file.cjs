const fs = require('fs');
const path = require('path');

const imagesDir = 'docs/images';
const jsonFilePath = 'src/images.json';

// Function to get all image files in a directory
function getImagesFromDir(directory) {
  return fs.readdirSync(directory).filter(file => {
    const fileExtension = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg'].includes(fileExtension);
  });
}

// Get all image files in the images directory
const imageFiles = getImagesFromDir(imagesDir);

// Get file stats for each image and sort them by the most recent date
const sortedImageFiles = imageFiles
  .map(file => {
    const filePath = path.join(imagesDir, file);
    const fileStats = fs.statSync(filePath);
    return {
      name: file,
      updatedAt: fileStats.mtime.getTime(), // Get timestamp of last modified time
    };
  })
  .sort((a, b) => b.updatedAt - a.updatedAt) // Sort in descending order by timestamp
  .map(file => file.name); // Extract only the file names

// Create a JSON object containing the sorted array of image names
const imagesJson = {
  images: sortedImageFiles,
};

// Convert JSON object to a string
const jsonString = JSON.stringify(imagesJson, null, 2);

// Write the JSON string to a file
fs.writeFileSync(jsonFilePath, jsonString);

console.log(`Images list has been saved to ${jsonFilePath}`);
