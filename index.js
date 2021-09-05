// Importing Node.js's fs capabilites
const fs = require("fs");
// Importing Inquirer npm package
const inquirer = require('inquirer');

// Creating variable for storing answers
var answersObject;

// Prompts functions to collect the project's information
function promptUser() {
    return inquirer
    .prompt([
        // Project title prompt
        {
            type: "input",
            name: "title",
            message: "What is the title of your project? (Required)",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                }
                else {
                    console.log("This is a required field. Please enter a title for your project.");
                    return false;
                }
            }
        },

        // Project description prompt
        {
            type: "input",
            name: "description",
            message: "Please enter a description for your project (Required): ",
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                }
                else {
                    console.log("This is a required field. Please enter a description for your project.")
                    return false;
                }
            }
        },

        // Application installation instructions prompt
        {
            type: "input",
            name: "installation",
            message: "Please provide instructions on how to install your application (Required): ",
            validate: installationInput => {
                if (installationInput) {
                    return true;
                }
                else {
                    console.log("This is a required field. Please provide installation instructions.")
                    return false;
                }
            }
        },

        // Application usage instructions
        {
            type: "input",
            name: "usage",
            message: "Please provide instructions on how to use your application (Required): ",
            validate: usageInput => {
                if (usageInput) {
                    return true;
                }
                else {
                    console.log("This is a required field. Please provide usage instructions.")
                    return false;
                }
            }
        },

        // Project license information
        {
            type: "list",
            name: "license",
            message: "Please choose a project license (Required): ",
            choices: ["GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0", "The Unlicense"],
            validate: licenseInput => {
                if (licenseInput) {
                    return true;
                }
                else {
                    console.log("This is a required field. Please choose a project license.")
                    return false;
                }
            }
        },

        // Project contributors information prompt
        {
            type: "input",
            name: "contributors",
            message: "Please provide instructions for prospective contributors to your project (Required): ",
            validate: contributorsInput => {
                if (contributorsInput) {
                    return true;
                }
                else {
                    console.log("This is a required field. Please provide instructions for prospective contributors to your project.")
                    return false;
                }
            }
        },

        // Application testing information
        {
            type: "input",
            name: "testing",
            message: "Please provide instructions for testing your application (Required): ",
            validate: testingInput => {
                if (testingInput) {
                    return true;
                }
                else {
                    console.log("This is a required field. Please provide instructions for testing your application.")
                    return false;
                }
            }
        },

        // Emaill address prompt
        {
            type: "input",
            name: "email",
            message: "Please provide your email address so that questions can be addressed to it (Required): ",
            validate: contactInput => {
                if (contactInput) {
                    return true;
                }
                else {
                    console.log("This is a required field. Please provide your email address.")
                    return false;
                }
            }
        },

        // GitHub username prompt
        {
            type: "input",
            name: "github",
            message: "Please provide your GitHub username (Required): ",
            validate: contactInput => {
                if (contactInput) {
                    return true;
                }
                else {
                    console.log("This is a required field. Please provide your GitHub username.")
                    return false;
                }
            }
        }
    ])
    .then((answers) => {
        // Save answers to an object to export
        answersObject = answers;

        // Writing file to the dist directory
        fs.writeFile(
            `./dist/${answersObject.title}-README.md`, 
`
# ${answersObject.title}
[![License: ${answersObject.license}](https://img.shields.io/badge/License-${answersObject.license}-yellow.svg)](https://choosealicense.com/licenses/)

**Description**: ${answersObject.description}

**Screenshots**:

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributions](#contributions)
* [Testing](#testing)
* [Questions](#questions)

### Installation
    ${answersObject.installation}
### Usage
    ${answersObject.usage}
### License
    ${answersObject.license}
### Contributions
    ${answersObject.contributors}
### Testing
    ${answersObject.testing}
### Questions
    Please [email](${answersObject.email}) me if you have any questions.
    You may also contact me through my [GitHub](https://github.com/${answersObject.github}) profile. 
`, 
            function (err) {if (err) return console.log(err);});

        // Inform the user that the application has completed execution
        console.log(`Thank you for using this application! Your ${answers.title}-README.md file has been created in the root directory's 'dist' folder.`);
    })
    .catch((error) => {
        if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log(error.isTtyError);
        } else {
        // Something else went wrong
        console.log(error);
        }
    });
}

// Run the prompts
promptUser();

// Export the answersObject
module.exports = { answersObject };