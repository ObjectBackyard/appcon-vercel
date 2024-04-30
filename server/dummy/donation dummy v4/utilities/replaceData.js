const fs = require('fs');
const path = require('path');

// Function to read JSON data from a file
const readJsonFile = (fileName) => {
  try {
    const filePath = path.join(__dirname, fileName);
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error reading file ${fileName}:`, error);
    return [];
  }
};

// Read data from donation-platform.causes.json
const causesData = readJsonFile('donation-platform.causes.json');

// Object to hold the data from each type file
const typeData = {};

// Read data from each type file and store it in the typeData object
const types = ['Animal', 'Community', 'Displacement', 'Earthquake', 'Education', 'Environment', 'Fire', 'Flood', 'Medical', 'Memorial', 'Nonprofit', 'Typhoon'];
types.forEach((type) => {
  typeData[type] = readJsonFile(`${type}.json`);
});

// Function to process the causes and replace title and post_content
const processCauses = (causes) => {
  return causes.map((cause) => {
    if (cause.type && typeData[cause.type]) {
      const typeContent = typeData[cause.type].pop(); // Get the last object from the type array
      if (typeContent) {
        cause.title = typeContent.title;
        cause.post_content = typeContent.description;
      }
    }
    return cause;
  });
};

// Process the causes data
const processedCauses = processCauses(causesData);

// Write the result to result.json
fs.writeFileSync(path.join(__dirname, 'result.json'), JSON.stringify(processedCauses, null, 2), 'utf8');

console.log('The data has been processed and saved to result.json.');
