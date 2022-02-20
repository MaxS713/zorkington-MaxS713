//boilerplate given
const { ok } = require("assert");
const { clear } = require("console");
const readline = require("readline");
const { runInThisContext } = require("vm");
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
let playerInventory = []
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
  constructor(name, description) {
    this.name = name
    this.description = description
  }
  async describe(){
    console.log (`${this.description}`)
    if (this.name === "table"){
      locationLookUp[locationCurrent].roomInventory.push(" Remote Control")
    }
    key()
    await keypress()
    game()
  }
}
class Item {
  constructor(name, name2, used) {
    this.name = name;
    this.name2 = name2;
    this.used = used;
  }

  async use(){
    console.clear()
    console.log (`${this.used}`)
    if (this.name === "package"){
      let i = playerInventory.indexOf(this.name2);
      playerInventory.splice(i, 1);
      key()
      await keypress()
      console.clear()
      console.log(`Hello ${playerName},\n\n\
Let me tell you why you're here. You know something. \
What you know, you can't explain. But you feel it. You felt it your entire life: \
Something's wrong with the world. You don't know what, but it's there. \
Like a splinter in your mind, driving you mad.\n\n\
The Xirtam? Do you want to know what it is?`)
      key()
      await keypress()
      console.clear()
      console.log("The Xirtam is everywhere. It is all around us. Even now, in this very room. \
You can see it when you look out your window or when you turn on your television. \
You can feel it when you go to work, when you go to church, when you pay your taxes. \
It is the world that has been, pulled over your eyes to blind you from the truth. \
The truth that you are a slave. Like everyone else, you were born into bondage... \
Born into a prison that you cannot smell or taste or touch.\n\n\
A prison ... for your mind.")
      key()
      await keypress()
      console.clear()
      console.log("Unfortunately, no one can be simply told what the Xirtam is.\
You have to see it for yourself.\n\n\
This is your last chance. After this, there is no turning back.\n\n\
You take the blue pill, the story ends, you wake up in your bed and believe \
whatever you want to believe.\n\n\
You take the red pill, you stay in Wonderland, and I show you how deep \
the blak and white rabbit hole goes...")

      let answer = await ask("\nDo you want to take the Blue Pill or the Red Pill? > ")
      answer = sani(answer)
      while (answer !== "blue" && answer !== "red") {
        confirm = await ask(`Answer Blue or Red \n\
> `);
      }
      if (answer === "blue") {
        console.log("")
        bluePill.use()
        key()
        await keypress()
        console.log("You wake up in your bed, you have no memory of what happened to you.\n\
        You resume your mundane life - program writer for a respectable software company.\n\
        You have a social security number. You pay your taxes. And you help your landlady \
        carry out her garbage.\n\n\
        As you head outside to go to work, you think to yourself:\n\
        You know that road. You know exactly where it ends.\n\
        And you somehow know that, things could have been different \
        this is not not where you want to be...\n\n\n\
                         THE END")
        await keypress()
        process.exit()
      } else if (answer ==="red"){
        console.log("\nYou swallow the Red pill...");
        key()
        await keypress()
        console.clear()
        console.log("Remember ...\n\n\
... all I'm offering is the truth, Nothing more.")
        playerInventory.push(" Blue Pill")
        key()
        await keypress()
        game()
      }
    } else if (this.name === "pill"){
      console.log("")
      bluePill.use()
      key()
      await keypress()
      console.log("You wake up in your bed, you have no memory of what happened to you.\n\
      You resume your mundane life - program writer for a respectable software company.\n\
      You have a social security number. You pay your taxes. And you help your landlady \
      carry out her garbage.\n\n\
      As you head outside to go to work, you think to yourself:\n\
      You know that road. You know exactly where it ends.\n\
      And you somehow know that, things could have been different \
      this is not not where you want to be...\n\n\n\
                       THE END")
      await keypress()
      process.exit()



    } else {
      key()
      await keypress()
      game()
    }
  }
}

let mirror = new RoomObject(
  "mirror",
  "You look into the mirror... You look different, like a projection of your ideal self. \
You're wearing a long black robe and your hair has changed.",
)

let sofa  = new RoomObject(
  "red sofa",
  "This sofa looks comfy, you sit in it and relax. \
Then you realize you might have more important things to do!"
)

let tv = new RoomObject(
  "tv",
  "An old looking TV, you're not sure how to turn it on..."
  )

let table = new RoomObject(
  "table",
  "You take a closer look at the end table and you decide to open the drawer. \
Inside you see a remote control."
)

let rabbit = new RoomObject(
  "rabbit",
  "It's a black and white rabbit. It's very cute. It's looking at you."
)

let hole = new RoomObject(
  "hole",
  "It's the rabbit's hole, you can see something shinning inside, \
but you can't reach it because the rabbit is in the way"
)

let desk = new RoomObject(
  "desk",
  "It's an old fashion, but sturdy desk. You decide to take a look in the drawer. \
You see a note inside. The note says E = 42"
)

let computer = new RoomObject(
  "computer",
  "It's one of those older computer. On the screen you see it saying: Please insert disk in drive A:"
)

let safe = new RoomObject(
  "safe",
  "an old looking safe -  looks like it needs a code"
)

let master = new RoomObject(
  "master",
  "You come closer to the martial art master. He's still silent and staring at you. \
As you get closer, the martial artist quickly pushes you away, and with a secret techique, \
slams you to the ground..."
)

let agent = new RoomObject(
  "agent",
  "agent"
)

let objectLookUp = {
  mirror,
  sofa,
  tv,
  table,
  rabbit,
  hole,
  desk,
  computer,
  safe,
  master,
  agent,
}


let package = new Item(
  "package",
  " Brown Package",
  "You open the package, inside you see an enveloppe that says: Welcome to the Xirtam.\n\
There's a small box, you open it and find two pills, a red pill and a blue pill.\n\
You open the enveloppe and start reading the letter inside..."
)

let remote = new Item(
  "remote",
  " Remote Control",
  "REMOTE",
)

let pill = new Item(
  "pill",
  " Blue Pill",
  "You swallow the Blue pill..."
)

let disk = new Item(
  "disk",
  " Floppy Disk",
  "Floppy DISK ACTION",
)

let carrot = new Item(
  "carrot",
  " Carrot",
  "CARROT ACTION",
)

let gun = new Item(
  "gun",
  " Gun",
  "Gun action",
)

let kungFu = new Item(
  "kung",
  " Kung-Fu Skills",
  "Kung-Fu ACTION",
)

let itemLookUp = {
  package,
  remote,
  pill,
  disk,
  carrot,
  gun,
  kungFu,
}

//Creating the locations
let room1 = new Location(
  "Main Room",
  "a room with bright white walls.",
  [" a mirror on the wall"],
  [" a door to the east", " a door to the south", " a door to the north"],
  [" Brown Package"],
);

let room2 = new Location(
  "second room",
  "a living room with a tv and a red sofa.",
  [" a red sofa", " a tv", " a small end table with a drawer"],
  [" a door to the west", " a door to the south", " a door to the east"],
  [],
);

let room3 = new Location(
  "third room",
  "a small room with a black and white rabbit and its rabbit hole.",
  [" a black and white rabbit", " a rabbit hole"],
  [" a door to the west", " a door to the south-west"],
  [],
);

let room4 = new Location(
  "the fourth room",
  "an office room.",
  [" a desk with a drawer", " an old desktop computer", " a safe"],
  [" a door to the north-east", " a door to the north", " a door to the west"],
  [],
);

let room5 = new Location(
  "the fifth room",
  "a dojo.",
  [" a martial art master"],
  [" a door to the east", " a door to the north"],
  [],
);

let room6 = new Location(
  "End City",
  "a city in ruins",
  [" an agent"],
  [" a door to the south"],
  [],
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
function log(log){
  console.log(log)
}

function key(){
  console.log("\n> Press any key to continue...")
}

function notSure(){
  console.log("\nNot sure what you're trying to say")
}

// function restart() {
//   room1Loop = 0;
//   room2Loop = 0;
//   room3Loop = 0;
//   room4Loop = 0;
//   room5Loop = 0;
//   room6Loop = 0;
//   playerName = "test";
//   mainMenu();
// }
// async function mainMenu() {
//   console.clear();
//   console.log(`\r\n\              __  __      \r\n\
//              \/ \/_\/ \/  ___ \r\n\
//             / __\/ _ \\\/ -_)\r\n\
//             \\__\/_\/\/_\/\\__\/  `);
//   console.log(`    ____  ___ __         __                  \r\n\
//     \\   \\\/  \/|__|_______\/  |______    _____  \r\n\
//      \\     \/ |  \\_  __ \\   __\\__  \\  \/     \\ \r\n\
//      \/     \\ |  ||  | \\\/|  |  \/ __ \\|  Y Y  \\\r\n\
//     \/___\/\\  \\|__||__|   |__| (____  \/__|_|  \/\r\n\
//           \\_\/                     \\\/      \\\/ \r\n`);
//   console.log(
//     "\n  Welcome to the Xirtam!\n\n\
// - Type in 1 to play\n\
// - Type in 2 for instructions (recommended before first playthrough)\n\n\
// Input: > "
//   );
//   await keypress();
//   start();
// }

// async function start() {
//   console.clear();
//   playerName = await ask("What is your name?\n\
// > ");
//   // let reversePlayerName = playerName.split("").reverse().join("");
//   playerName = capitalize(playerName);
//   // reversePlayerName = capitalize(reversePlayerName);

//   let confirm = await ask(`\nYour name is ${playerName}? Y or N\n\
// > `);
//   confirm = sani(confirm);
//   while (confirm !== "y" && confirm !== "n") {
//     confirm = await ask(`Answer with Y or N \n\
// > `);
//   }
//   if (confirm === "y") {
//     console.clear();
//     console.log(`\n Ok, your name is ${playerName}\n\n\
// Press any key when you're ready to start the game!`);
//     await keypress();
//     introSequence();
//   } else {
//     start();
//   }
// }

// async function introSequence(){
//   console.clear()
//   setTimeout(() => {console.log(`Wake up, ${playerName}...`)}, 2500);
//   setTimeout(() => {console.clear()}, 6000)
//   setTimeout(() => {console.log("The Xirtam has you...")}, 8000);
//   setTimeout(() => {console.clear()}, 12000)
//   setTimeout(() => {console.log("Follow the black and white rabbit.")}, 15000);
//   setTimeout(() => {console.clear()}, 19500)
//   setTimeout(() => {console.log(`Knock, knock, ${playerName}.`)}, 21500);
//   setTimeout(() => {console.clear()}, 24500)
//   setTimeout(() => {console.log("\n\n     *KNOCK* *KNOCK*")}, 26500);
//   setTimeout(() => {console.clear()}, 30000)
//   setTimeout(game, 32000)
// }

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
  

//   console.clear()
//   if( locationCurrent === "room1" && room1Loop === 0){
//     room1Loop++
//     console.log("You wake up to the sound of somebody knocking \
// at the door, you're in a bright room with white walls \
// and your head hurts...\n\
// You don't remember how you fell asleep or how you got here...\n\
// You hear the sound of something falling on the ground, \
// the person who knocked passed a package through a slot in a door\n\
// As you stand up, you startle a black and white rabbit that runs through a small hole in the wall going east\n\
// key()")
//     await keypress();
//   }

//   if( locationCurrent === "room2" && room2Loop === 0){
//     room2Loop++
//     console.log("As you enter a room, you can see the black and white rabbit \
// continuing to hop towards the east\n\
// The room is very odd, it's entirely empty except for a red sofa and an old CRT TV on a small end table...\n\
// key()")
//     await keypress();
//   }

//   if( locationCurrent === "room3" && room3Loop === 0){
//     room3Loop++
//     console.log("You enter a tiny room, where you can see the black and white rabbit that was running away.\n\
// As you enter, it jumps into his rabbit hole and looks at you timidly.\n\
// > Press any key to continue")
//     await keypress();
//   }

//   if( locationCurrent === "room4" && room4Loop === 0){
//     room4Loop++
//     console.log("You enter a room that looks like an office room\n\
// In it, there's a desk with an ancient IBM desktop computer. In the corner of the room, you also notice a safe.\n\
// key()")
//     await keypress();
//   }

//   if( locationCurrent === "room5" && room5Loop === 0){
//     room4Loop++
//     console.log("The room your enter is a dojo\n\
// You're surprised to see someone is here. What seems to be a martial art expert stands in the center.\n\
// He doesn't say anything - he's staring at you, silently.\n\
// key()")
//     await keypress();
//   }

  console.clear();
  console.log(`You are in the ${locationLookUp[locationCurrent].name}, \
${locationLookUp[locationCurrent].description}\n`);
  console.log(`What you can see around you:${locationLookUp[locationCurrent].objectsInRoom}...\n`);
  if (locationLookUp[locationCurrent].roomInventory.length !== 0) {
    console.log(`The room contains:${locationLookUp[locationCurrent].roomInventory}\n`);
  }
  console.log(`Doors you can go through:${locationLookUp[locationCurrent].doors}\n`);
  if (playerInventory.length !== 0 ){
    console.log(`Your inventory:${playerInventory}\n`)
  }

  let answer = await ask("What would you like to do?\n\n\
> ");

  saniAnswer = sani2(answer);
  let splitAnswer = saniAnswer.split(" ");
  checkLoop = 0;

  if (splitAnswer.includes("inspect")){

    for (let word of splitAnswer){
      
      if (objectLookUp[word]){
        console.log(objectLookUp[word].name)
        console.log(locationLookUp[locationCurrent].objectsInRoom)
        if (locationLookUp[locationCurrent].objectsInRoom.toString().includes(objectLookUp[word].name)){
          console.clear()
          objectLookUp[word].describe()
        } else {
          notSure()
          setTimeout(game, 2000);
        }
      }
    }     

  } else if (splitAnswer.includes("go")|| splitAnswer.includes("move")) {

    for (let word of splitAnswer){
      if (directions.includes(word)){
        if (locationStates[locationCurrent].includes(word)){
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

          console.log(`\nYou're going through the door heading ${sani(directionHeaded)}!`);
          setTimeout(game, 2000);

        } else if (checkLoop === 0) {
          console.log("\nYou can't go in that direction...");
          setTimeout(game, 2000);
        } else {
          notSure()
          setTimeout(game, 2000);
        }
      }
    }
  } else if (splitAnswer.includes("use")){
    for (let word of splitAnswer){
      if(itemLookUp[word]){
        if (itemLookUp[word].name && playerInventory.includes(itemLookUp[word].name2)){
          itemLookUp[word].use()          
        } else {
          notSure()
          setTimeout(game, 2000);
        }
      }
    }
  } else if (splitAnswer.includes("take")){
    for (let word of splitAnswer){
      if(itemLookUp[word]){
        if (itemLookUp[word].name){
          console.log(`\nYou pick up the${itemLookUp[word].name2}`)
          playerInventory.push(itemLookUp[word].name2)
          let i = locationLookUp[locationCurrent].roomInventory.indexOf(itemLookUp[word].name2);
          locationLookUp[locationCurrent].roomInventory.splice(i, 1);
          setTimeout (game, 2000)
        } else {
          notSure()
          setTimeout(game, 2000);
        }
      }
    }
  } else {
    notSure()
    setTimeout(game, 2000);
  }
}

game();

// mainMenu()