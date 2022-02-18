//boilerplate given
const { ok } = require('assert');
const { clear } = require('console');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);
//found this on google that allows you to await any keypress - useful!
const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

let playerName = "test"

////Functions I'll need

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//Functions to capitalize a string
function capitalize(string) {
  let firstLetter = string.charAt(0);
  let restOfWord = string.slice(1);
  let fullWord = firstLetter.toUpperCase() + restOfWord.toLowerCase();
  return fullWord;
}

//Function to 'sanitize' a string
function sani(inputToSani) {
  return inputToSani.toLowerCase().replaceAll(" ", "");
}

//Function to 'validate' a Y or N input
function validateYNInput(x) {
  if (sani(x) !== "y" && sani(x) !== "n") {
    return false;
  } else {
    return true;
  }
}


async function start() {
  console.clear()
  playerName = await ask("What is your name?\n\
>");
  // let reversePlayerName = playerName.split("").reverse().join("");
  playerName = capitalize(playerName);
  // reversePlayerName = capitalize(reversePlayerName);
  
  let confirm = await ask(`Is your name ${playerName}? Y or N\n\
>`);  
  while (validateYNInput(confirm) !== true){
    confirm = await ask(`Answer with Y or N \n\
>`);  
  }

console.log (`Ok, your name is ${playerName}\n\
Press any key when you're ready to start!`);
await keypress()
introSequence()
}

async function introSequence(){
console.clear()
  setTimeout(() => {console.log(`Wake up, ${playerName}...`)}, 2500);
  setTimeout(() => {console.clear()}, 6000)
  setTimeout(() => {console.log("The Xirtam has you...")}, 8000);
  setTimeout(() => {console.clear()}, 12000)
  setTimeout(() => {console.log("Follow the black and white rabbit.")}, 15000);
  setTimeout(() => {console.clear()}, 19500)
  setTimeout(() => {console.log(`Knock, knock, ${playerName}.`)}, 21500);
  setTimeout(() => {console.clear()}, 24500)
  setTimeout(() => {console.log("*KNOCK* *KNOCK*")}, 26500);
  setTimeout(() => {console.clear()}, 30000)
  setTimeout(() => {console.log("You wake up to the sound of somebody knocking \
at the door, you're in a bright room with white walls \
and your head hurts...\n\
> Press any key to get up")}, 32000)
  await keypress();
  game();
}

async function game(){
  
//Constructing the Location Class
class Location {
  constructor(name, description, objectsInRoom, roomInventory) {
    this.name = name;
    this.description = description;
    this.objectsInRoom = objectsInRoom;
    this.roomInventory = roomInventory;
  }
}

//Create new location objects
let mainRoom = new Location("Main Room", "a room with bright white walls.",["a mirror on the wall", " a door on the left", " a door on your right"],  ["a brown package"]);
let street = new Location("street", "I am on the street");
let store = new Location("store", "I am at the store");

//Create a location look up table
let locationLookUp = {
  mainRoom,
  street,
  store,
};

//define your current location state
let locationCurrent = mainRoom;

//Create state machine 
let locationStates = {
  mainRoom: ["street"],
  street: ["home", "store"],
  store: ["street"],
};

//Create function that allows the user to change location permitting that the state machine allows it
function moveLocation(newLocation) {
  let validTransitions = locationStates[locationCurrent];
  if (validTransitions.includes(newLocation)) {
    locationCurrent = newLocation;
    console.log(locationLookUp[locationCurrent].description);
  } else {
    console.log(
      "Invalid state transition attempted from " +
        locationCurrent +
        " to " +
        newLocation
    );
  }
}

// //Invokation and other Sorcery
// moveLocation("street");
// moveLocation("store");
// moveLocation("home");
// moveLocation("street");
// moveLocation("home");


  console.clear()
  console.log(`You are in the ${locationCurrent.name}, ${locationCurrent.description}\n`)
  console.log(`What you can see around you: ${locationCurrent.objectsInRoom}\n`)
  console.log(`The room contains: ${locationCurrent.roomInventory} `);

  
  let answer = await ask("\nWhat would you like to do?\n\
>");
}

start()
