#!/usr/bin/env node

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

// Function to extract the date from an image name and convert it to a Date object
function extractAndConvertToDate(imageName) {
  let match = imageName.match(/_(\d{8}_\d{6})\.png$/);
  if (match) {
    const dateString = match[1];
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10);
    const day = parseInt(dateString.substring(6, 8), 10);
    const hour = parseInt(dateString.substring(9, 11), 10);
    const minute = parseInt(dateString.substring(11, 13), 10);
    const second = parseInt(dateString.substring(13, 15), 10);
    return new Date(year, month, day, hour, minute, second);
  }

  match = imageName.match(/(\d{4}-\d{2}-\d{2} \d{6})\.png$/);
  if (match) {
    const dateString = match[1];
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(5, 7), 10);
    const day = parseInt(dateString.substring(8, 10), 10);
    const hour = parseInt(dateString.substring(11, 13), 10);
    const minute = parseInt(dateString.substring(13, 15), 10);
    const second = parseInt(dateString.substring(15, 17), 10);
    return new Date(year, month, day, hour, minute, second);
  }

  return null;
}

// Sort the array of image files in descending order based on the extracted and converted dates
const sortedImageFiles = imageFiles.slice().sort((a, b) => {
  const dateA = extractAndConvertToDate(a);
  const dateB = extractAndConvertToDate(b);
  if (dateA && dateB) {
    return dateB - dateA; // Reversed comparison for descending order
  } else if (dateA) {
    return -1;
  } else if (dateB) {
    return 1;
  }
  return a.localeCompare(b);
});

// Create a JSON object containing the sorted array of image names
const imagesJson = {
  images: sortedImageFiles,
};

// Convert JSON object to a string
const jsonString = JSON.stringify(imagesJson, null, 2);

// Write the JSON string to a file
fs.writeFileSync(jsonFilePath, jsonString);

console.log(`Images list has been saved to ${jsonFilePath}`);
