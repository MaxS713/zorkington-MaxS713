//boilerplate given
const { ok } = require("assert");
const { clear } = require("console");
const readline = require("readline");
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

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

let room1Loop = 0;
let room2Loop = 0;
let room3Loop = 0;
let room4Loop = 0;
let room5Loop = 0;
let room6Loop = 0;
let checkLoop = 0;
let x = 2;
let y = 2;
let directions = [
  "east",
  "south",
  "north",
  "west",
  "southwest",
  "southeast",
  "northeast",
  "northwest",
];
let playerName = "test";

//the Location Class with its constructor
class Location {
  constructor(name, description, objectsInRoom, doors, roomInventory) {
    this.name = name;
    this.description = description;
    this.objectsInRoom = objectsInRoom;
    this.doors = doors;
    this.roomInventory = roomInventory;
  }
}
//the RoomObject Class with its constructor

class RoomObject {
  constructor() {}
}

class Item {
  constructor() {}
}

//Creating the locations
let room1 = new Location(
  "Main Room",
  "a room with bright white walls.",
  [" a mirror on the wall", " a door on the left", " a door on your right"],
  [" a door to the east", " a door to the south", " a door to the north"],
  [" a brown package"]
);

let room2 = new Location(
  "second room",
  "a living room with a tv and a red sofa.",
  [" a red sofa", " a tv", " a small end table with a drawer"],
  [" a door to the west", " a door to the south", " a door to the east"]
);

let room3 = new Location(
  "third room",
  "a small room with a black and white rabbit and its rabbit hole.",
  [" a black and white rabbit", " a rabbit hole"],
  [" a door to the west", " a door to the south-west"]
);

let room4 = new Location(
  "the fourth room",
  "an office room.",
  [" a desk with a drawer", " an old desktop computer", " a safe"],
  [" a door to the north-east", " a door to the north", " a door to the west"]
);

let room5 = new Location(
  "the fifth room",
  "a dojo.",
  [" a martial art master"],
  [" a door to the east", " a door to the north"]
);

let room6 = new Location(
  "End City",
  "a city in ruins",
  [" an agent"],
  [" a door to the south"]
);

//Look up table
let locationLookUp = {
  room1,
  room2,
  room3,
  room4,
  room5,
  room6,
};

//State machine
let locationStates = {
  room1: ["east", "south", "north"],
  room2: ["west", "east", "south"],
  room3: ["east", "southwest"],
  room4: ["northeast", "north", "west"],
  room5: ["east", "north"],
  room6: ["south"],
};

////Functions I'll need

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//Functions to capitalize a string
function capitalize(string) {
  string = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return string;
}

//Function to 'sanitize' a string
//by lowercasing everything and taking away all spaces
function sani(inputToSani) {
  return inputToSani.toLowerCase().replaceAll(" ", "").replaceAll("-", "");
}

function sani2(inputToSani2) {
  return inputToSani2.toLowerCase().replaceAll("-", "");
}

//Function to 'validate' a Y or N input - NEEDED?
function validateYNInput(x) {
  if (sani(x) !== "y" && sani(x) !== "n") {
    return false;
  } else {
    return true;
  }
}

function restart() {
  room1Loop = 0;
  room2Loop = 0;
  room3Loop = 0;
  room4Loop = 0;
  room5Loop = 0;
  room6Loop = 0;
  playerName = "test";
  mainMenu();
}
async function mainMenu() {
  console.clear();
  console.log(`\r\n\              __  __      \r\n\
             \/ \/_\/ \/  ___ \r\n\
            / __\/ _ \\\/ -_)\r\n\
            \\__\/_\/\/_\/\\__\/  `);
  console.log(`    ____  ___ __         __                  \r\n\
    \\   \\\/  \/|__|_______\/  |______    _____  \r\n\
     \\     \/ |  \\_  __ \\   __\\__  \\  \/     \\ \r\n\
     \/     \\ |  ||  | \\\/|  |  \/ __ \\|  Y Y  \\\r\n\
    \/___\/\\  \\|__||__|   |__| (____  \/__|_|  \/\r\n\
          \\_\/                     \\\/      \\\/ \r\n`);
  console.log(
    "\n  Welcome to the Xirtam!\n\n\
- Type in 1 to play\n\
- Type in 2 for instructions (recommended before first playthrough)\n\n\
Input: > "
  );
  await keypress();
  start();
}

async function start() {
  console.clear();
  playerName = await ask("What is your name?\n\
> ");
  // let reversePlayerName = playerName.split("").reverse().join("");
  playerName = capitalize(playerName);
  // reversePlayerName = capitalize(reversePlayerName);

  let confirm = await ask(`Is your name ${playerName}? Y or N\n\
> `);
  confirm = sani(confirm);
  while (confirm !== "y" && confirm !== "n") {
    confirm = await ask(`Answer with Y or N \n\
> `);
  }
  if (confirm === "y") {
    console.clear();
    console.log(`\n Ok, your name is ${playerName}\n\n\
Press any key when you're ready to start the game!`);
    await keypress();
    introSequence();
  } else {
    start();
  }
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
  setTimeout(() => {console.log("\n\n     *KNOCK* *KNOCK*")}, 26500);
  setTimeout(() => {console.clear()}, 30000)
  setTimeout(game, 32000)
}

async function game() {
  if (x === 2 && y === 2) {
    locationCurrent = "room1";
  } else if (x === 3 && y === 2) {
    locationCurrent = "room2";
  } else if (x === 4 && y === 2) {
    locationCurrent = "room3";
  } else if (x === 3 && y === 1) {
    locationCurrent = "room4";
  } else if (x === 2 && y === 1) {
    locationCurrent = "room5";
  } else if (x === 2 && y === 3) {
    locationCurrent = "room6";
  }
  

  console.clear()
  if( locationCurrent === "room1" && room1Loop === 0){
    room1Loop++
    console.log("You wake up to the sound of somebody knocking \
at the door, you're in a bright room with white walls \
and your head hurts...\n\
You don't remember how you fell asleep or how you got here...\n\
You hear the sound of something falling on the ground, \
the person who knocked passed a package through a slot in a door\n\
As you stand up, you startle a black and white rabbit that runs through a small hole in the wall going east\n\
> Press any key to continue")
    await keypress();
  }

  if( locationCurrent === "room2" && room2Loop === 0){
    room2Loop++
    console.log("As you enter a room, you can see the black and white rabbit \
continuing to hop towards the east\n\
The room is very odd, it's entirely empty except for a red sofa and an old CRT TV on a small end table...\n\
> Press any key to continue")
    await keypress();
  }

  if( locationCurrent === "room3" && room3Loop === 0){
    room3Loop++
    console.log("You enter a tiny room, where you can see the black and white rabbit that was running away.\n\
As you enter, it jumps into his rabbit hole and looks at you timidly.\n\
> Press any key to continue")
    await keypress();
  }

  if( locationCurrent === "room4" && room4Loop === 0){
    room4Loop++
    console.log("You enter a room that looks like an office room\n\
In it, there's a desk with an ancient IBM desktop computer. In the corner of the room, you also notice a safe.\n\
> Press any key to continue")
    await keypress();
  }

  if( locationCurrent === "room5" && room5Loop === 0){
    room4Loop++
    console.log("The room your enter is a dojo\n\
You're surprised to see someone is here. What seems to be a martial art expert stands in the center.\n\
He doesn't say anything - he's staring at you, silently.\n\
> Press any key to continue")
    await keypress();
  }

  console.clear();
  console.log(`You are in the ${locationLookUp[locationCurrent].name}, \
  ${locationLookUp[locationCurrent].description}\n`);
  console.log(`What you can see around you:${locationLookUp[locationCurrent].objectsInRoom}...\n`);
  if (locationLookUp[locationCurrent].roomInventory) {
    console.log(`The room contains:${locationLookUp[locationCurrent].roomInventory}\n`);
  }
  console.log(`Doors you can go through:${locationLookUp[locationCurrent].doors}\n`);

  let answer = await ask("What would you like to do?\n\n\
> ");

  saniAnswer = sani2(answer);
  let splitAnswer = saniAnswer.split(" ");
  checkLoop = 0;

  for (let word of splitAnswer) {
    if (directions.includes(word)) {
      if (locationStates[locationCurrent].includes(word)) {
        checkLoop++;
        directionHeaded = "";
        if (answer.includes("east")) {
          directionHeaded = directionHeaded + "east";
          x++;
        }
        if (answer.includes("west")) {
          directionHeaded = directionHeaded + "west";
          x--;
        }
        if (answer.includes("south")) {
          directionHeaded = "south" + directionHeaded;
          y--;
        }
        if (answer.includes("north")) {
          directionHeaded = "north" + directionHeaded;
          y++;
        }

        console.log(`\nYou're going through the door heading ${capitalize(directionHeaded)}!`);

        setTimeout(game, 3000);
      } else if (checkLoop === 0) {
        console.log("You can't go in that direction...");
        setTimeout(game, 2500);
      } else {
        console.log("Not sure what you're trying to say");
        setTimeout(game, 2500);
      }
    }
  }
}

// game();

mainMenu()
