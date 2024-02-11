// boilerplate needed for enabling readline inputs
const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// wrap the text to 80 characters: It just works!
const wrap = (s) => s.replace(/(?![^\n]{1,80}$)([^\n]{1,80})\s/g, "$1\n");

// function to print and wrap text
function displayText(string) {
  console.log(wrap(string));
}

// Functions to capitalize a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// I print these phrases a lot, so these functions make it easy to call them
function pressEnterText() {
  displayText("\n> Press enter to continue...");
}

function notSureText() {
  displayText("\nNot sure what you're trying to do...");
}

// found this online that allows you to await any keypress - quite useful!
const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) => {
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    });
  });
};

// function to await an input from user im terminal
function ask(questionText) {
  return new Promise((resolve) => {
    readlineInterface.question(questionText, resolve);
  });
}

// Function to 'sanitize' inputs
// all punctuation marks are removed)
function sanitizeInput(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/['!'#$%&\\'()*+,\-./:;<=>?@[\\\]^_`{|}~']/g, "");
}

const sleep = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

module.exports = {
  displayText,
  capitalize,
  pressEnterText,
  notSureText,
  keypress,
  ask,
  sanitizeInput,
  sleep,
};
