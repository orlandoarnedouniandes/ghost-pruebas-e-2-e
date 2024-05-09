const path = require('path');

// Get the current date and time
let date = new Date();
let dateStr = 
  date.getFullYear() + "_" +
  ("00" + (date.getMonth() + 1)).slice(-2) + "_" +
  ("00" + date.getDate()).slice(-2) + "__" +
  ("00" + date.getHours()).slice(-2) + "_" +
  ("00" + date.getMinutes()).slice(-2) + "_" +
  ("00" + date.getSeconds()).slice(-2);

// Define the screenshots folder
let screenshotsFolder = path.join('screenshots', dateStr);

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    screenshotsFolder: screenshotsFolder,
  },
};
