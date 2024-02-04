//Three requires
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// This is the prmopt user function that which is calling inquirer.prompt. Below it is various questions that will be in the file.
const promptUser = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "nameOfRepo",
      message: "What is the name of your Repo?",
    },
    {
      type: "input",
      name: "description",
      message: "Write a description for your project.",
    },
    {
      type: "test",
      name: "tableOfContents",
      message: "Add your relevant links to navigate around the README",
    },
    {
      type: "input",
      name: "installation",
      message:
        "If applicable, describe the steps required to install your project.",
    },
    {
      type: "input",
      name: "usage",
      message: "Provide instructions and examples of your project in use ",
    },
    {
      type: "list",
      name: "license",
      message: "choose a license for your project",
      choices: [
        "GNU LGPLv3",
        "Mozilla Public License 2.0",
        "Apache License 2.0",
        "MIT License",
        "No license",
      ],
    },
    {
      type: "input",
      name: "contributing",
      message:
        "If applicable, provide guidelines on how other developers can contribute to your project.",
    },
    {
      type: "input",
      name: "tests",
      message:
        "If applicable, provide any tests written for your application and provide examples on how to run them.",
    },
    {
      type: "input",
      name: "questions",
      message:
        "please add your GitHub username and email address to be contacted if anyone has any questions.",
    },
  ]);

//This function takes in the data from above and then returns it.
const createMarkdownFile = (data) => {
  console.log(data);
  const {
    nameOfRepo,
    description,
    tableOfContents,
    installation,
    usage,
    license,
    contributing,
    tests,
    questions,
  } = data; //object destructuring

  return `
    ## ${nameOfRepo}
    ## ${description}
    ## ${tableOfContents}
    ## ${installation}
    ## ${usage}
    ## ${license}
    ## ${contributing}
    ## ${tests}
    ## ${questions}
    `;
};

// Prompt user function is called here. When it is called, it passes in the data and the generateREADME.md file is being created. The createMarkdownFile is being run with the data inside of it.
promptUser()
  .then((data) => writeFileAsync("generateREADME.md", createMarkdownFile(data)))
  .then(
    () =>
      console.log(
        "You have added your data successfully to the README.md file."
      ) //If it passes then the success message will be displayed. If not then the error message will be.
  )
  .catch((err) => console.log(err));
