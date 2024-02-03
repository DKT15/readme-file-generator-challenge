// const fs = require("fs");
// const path = require('path');
// const inquirer = require("inquirer");
// const generateMarkdown = require("./utils/generateMarkdown");

// // array of questions for user
// const questions = [

// ];

// // function to write README file
// function writeToFile(fileName, data) {
// }

// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();

const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
  {
    type: "input",
    name: "fileName",
    message: "name of your file",
  },
  {
    type: "list",
    name: "fileType",
    message: "choose the file extension",
    choices: ["md", "txt", "html"],
  },
  {
    type: "input",
    name: "header",
    message: "please type a header",
  },
];

const createHTMLTemplate = (header) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>

  <body>
    <header>${header}</header>
  </body>
</html>
    `;
};

const createMarkdownTemplate = (header) => {
  return `
    # ${header}
    `;
};

inquirer.prompt(questions).then((data) => {
  const { fileName, fileType, header } = data; //object destructuring
  const file = `${fileName}.$[fileType]`;
  let fileText;

  switch (fileType) {
    case "html":
      fileText = createHTMLTemplate(header);
      break;
    case "md":
      fileText = createMarkdownTemplate(header);
      break;

    default:
      fileText = "This file type isn't implemented yet";
      break;
  }

  fs.writeFile(file, fileText, (err) =>
    err ? console.log("There is an error") : console.log("It worked!")
  );
});
