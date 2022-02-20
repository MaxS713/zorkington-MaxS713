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

const wrap = (s) => s.replace(
  /(?![^\n]{1,80}$)([^\n]{1,80})\s/g, '$1\n'
);

function log(string){
  console.log(wrap(string))
}

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
let doorLoop = 0;
let carrotLoop = 0;
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
let objectList = [
  "mirror",
  "sofa",
  "tv",
  "table",
  "rabbit",
  "hole",
  "desk",
  "computer",
  "safe",
  "master",
  "agent",
];
let itemList = ["package", "remote", "pill", "disk", "carrot", "kung", "key"];
let playerInventory = [];
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
    this.name = name;
    this.description = description;
  }
  async describe() {
    log(`${this.description}`);
    if (this.name === "table") {
      locationLookUp[locationCurrent].roomInventory.push(" Remote Control");
      keyPress();
      await keypress();
      game();
    } else if (this.name === "hole" && carrotLoop === 0) {
      log("\nYou can see something shining inside, \
but you can't reach it because the rabbit is in the way and rabbits are stubborn.")
      keyPress();
      await keypress();
      game();
    } else if (this.name === "safe") {
      let codeInput = await ask("\nWhat code do you input? > ");
      if (codeInput === "3587") {
        log("\nThe safe opens!");
        log("You see a Floppy Disk Inside...");
        keyPress();
        await keypress();
        locationLookUp[locationCurrent].roomInventory.push(disk.name2);
        game();
      } else {
        log("\nThat didn't seem to work...");
        keyPress();
        await keypress();
        game();
      }
    } else if (this.name === "agent") {
      log(`\nHello ${playerName}!!\n\n\
So good of you to join us...\n\n\
Welcome to the desert of the REAL!\n\n\n\
TO BE CONTINUED...\n\n\
Thanks for playing!\n\n\
> Press any key to exit.`);
      await keypress();
      process.exit();
    } else {
      keyPress();
      await keypress();
      game();
    }
  }
}
class Item {
  constructor(name, name2) {
    this.name = name;
    this.name2 = name2;
  }

  async use() {
    if (this.name === "package") {
      let i = playerInventory.indexOf(this.name2);
      playerInventory.splice(i, 1);
      console.clear();
      log(
        "You open the package, inside you see an envelope that says: Welcome to the Xirtam.\n\
There's a small box, you open it and find two pills, a red pill and a blue pill.\n\
You open the envelope and start reading the letter inside..."
      );
      keyPress();
      await keypress();
      console.clear();
      log(`Hello ${playerName},\n\n\
Let me tell you why you're here. You know something. \
What you know, you can't explain. But you feel it. You felt it your entire life: \
Something's wrong with the world. You don't know what, but it's there. \
Like a splinter in your mind, driving you mad.\n\n\
The Xirtam? Do you want to know what it is?`);
      keyPress();
      await keypress();
      console.clear();
      log(
        "The Xirtam is everywhere. It is all around us. Even now, in this very room. \
You can see it when you look out your window or when you turn on your television. \
You can feel it when you go to work, when you go to church, when you pay your taxes. \
It is the world that has been, pulled over your eyes to blind you from the truth. \
The truth that you are a slave. Like everyone else, you were born into bondage... \
Born into a prison that you cannot smell or taste or touch.\n\n\
A prison ... for your mind."
      );
      keyPress();
      await keypress();
      console.clear();
      log(
        "Unfortunately, no one can be simply told what the Xirtam is. \
You have to see it for yourself.\n\n\
This is your last chance. After this, there is no turning back.\n\n\
You take the blue pill, the story ends, you wake up in your bed and believe \
whatever you want to believe.\n\n\
You take the red pill, you stay in Wonderland, and I show you how deep \
the black and white rabbit hole goes..."
      );

      let answer = await ask("\nDo you want to take the Blue Pill or the Red Pill? > ");
      answer = sani(answer);
      while (answer !== "blue" && answer !== "red") {
        answer = await ask(`Answer Blue or Red \n\
> `);
        answer = sani(answer)
      }
      if (answer === "blue") {
        log("\nYou swallow the Blue pill...");
        keyPress();
        await keypress();
        console.clear();
        log("You wake up in your bed, you have no memory of what happened to you.\n\
You resume your mundane life - program writer for a respectable software company.\n\
You have a social security number. You pay your taxes. And you help your landlady \
carry out her garbage.\n\n\
As you head outside to go to work, you think to yourself:\n\
You know that road. You know exactly where it ends.\n\
And you somehow know that, things could have been different \
this is not not where you want to be...\n\n\n\
                         THE END");
        await keypress();
        process.exit();
      } else if (answer === "red") {
        log("\nYou swallow the Red pill...\n\n\
but you also decide to keep the blue pill in your back pocket \
in case you made the wrong decision and want to exit the game.");
        keyPress();
        await keypress();
        console.clear();
        log("Remember ...\n\n\
... all I'm offering is the truth, Nothing more.\n\n\
Also be sure to remember this: S = 3");
        playerInventory.push(" Blue Pill");
        keyPress();
        await keypress();
        game();
      }
    } else if (this.name === "pill") {
      console.clear();
      log("\nYou swallow the Blue pill...");
      keyPress();
      await keypress();
      console.clear();
      log("You wake up in your bed, you have no memory of what happened to you.\n\
You resume your mundane life - program writer for a respectable software company.\n\
You have a social security number. You pay your taxes. And you help your landlady \
carry out her garbage.\n\n\
As you head outside to go to work, you think to yourself:\n\
You know that road. You know exactly where it ends.\n\
And you somehow know that, things could have been different \
this is not not where you want to be...\n\n\n\
                       THE END");
      await keypress();
      process.exit();
    } else if (this.name === "remote") {
      if (locationCurrent !== "room2") {
        log("You can't use that here...");
        setTimeout(game, 2000);
      } else {
        console.clear();
        log(`You push the power button of the remote and the TV turns on \
and a tape starts playing.\n\
A person dressed in leather and wearing sunglasses appears and start talking...\n\n\
Hello ${playerName}, I've been expecting you.\n\
I am Suehprom. It's an honor to meet you.\n\n\
Welcome to the Construct. It's a loading program. \
You're inside a computer program, your clothes are different, your hair has changed. \
None of this is real. Do you think that's air you're breathing now?\n\
What is "real"? If we're talking about what you can feel, \
what you can smell, taste and see. Then "real" is simply \
electrical signals interpreted by your brain.\n\n\
The world as it was at the beginning of the 21th century \
exists now only as part of a neural-interactive simulation that we call the Xirtam.\n\
You've been living in a dream world, ${playerName}.\n\
Come join us and learn the truth. \n\n\
To do this, all you need to know to know right now is A = 5, it will make sense soon…`);
        keyPress();
        await keypress();
        game();
      }
    } else if (this.name === "disk") {
      if (locationCurrent !== "room4") {
        log("You can't use that here...");
        setTimeout(game, 2000);
      } else {
        let i = playerInventory.indexOf(this.name2);
        playerInventory.splice(i, 1);
        console.clear();
        log(`You insert the disk into the computer...\n\n\
A folder called "kung-fu" appears, you open it, a whole bunch of videos \
about kung fu start playing... \n\
You sit there for about 2 hours.\n\n\
At the end, you tell to yourself: "I know Kung Fu."`);
        playerInventory.push(kung.name2);
        keyPress();
        await keypress();
        game();
      }
    } else if (this.name === "kung") {
      if (locationCurrent !== "room5") {
        log("You can't use that here...");
        setTimeout(game, 2000);
      } else {
        let i = playerInventory.indexOf(this.name2);
        playerInventory.splice(i, 1);
        console.clear();
        log(`You now know Kung-Fu and have the confidence \
to take on the martial arts master,\n\
He tries to push you away, but you block his arms. \
There ensues a long fight of about 15 minutes, both of you returning blows for blows.\n\
Then suddenly he blocks your final punch and says:\n\
"Stop!... Enough... apologies about all of that, I just needed to be sure that you were the One.\n\n\
You do not truly know someone, until you fight them."\n\n\
He hands you a carrot and says, "Here, take this. I have a feeling you will need it."\n\n\
"Why on earth did he give me a carrot?" you think to yourself.\n\n\
The martial arts master has resumed his position and says nothing...`);
        playerInventory.push(carrot.name2);
        keyPress();
        await keypress();
        game();
      }
    } else if (this.name === "carrot") {
      if (locationCurrent !== "room3") {
        log("You can't use that here...");
        setTimeout(game, 2000);
      } else {
        carrotLoop++
        let i = playerInventory.indexOf(this.name2);
        playerInventory.splice(i, 1);
        console.clear();
        log(`You hand the carrot to the black and white rabbit,\n\
The rabbit inspects it carefully. Then suddenly its eyes go wide! It raises its ears, bites into the carrot, \
takes it, and runs away!\n\n\
You can now see the item that was in its hole: it's a golden key.`);
        locationLookUp[locationCurrent].roomInventory.push(key.name2);
        keyPress();
        await keypress();
        game();
      }
    } else if (this.name === "key") {
      if (locationCurrent !== "room1") {
        log("You can't use that here...");
        setTimeout(game, 2000);
      } else {
        let i = playerInventory.indexOf(this.name2);
        playerInventory.splice(i, 1);
        log("\nYou use the golden key on the door heading north...\n\
It unlocks...");
        doorLoop++;
        keyPress();
        await keypress();
        game();
      }
    } else {
      keyPress();
      await keypress();
      game();
    }
  }
}

let mirror = new RoomObject(
  "mirror",
  "You look into the mirror... You look different.\n\
You're wearing a long black robe and your hair has changed."
);

let sofa = new RoomObject(
  "red sofa",
  "This sofa looks comfy, you sit in it and relax. \
Then you realize you might have more important things to do!"
);

let tv = new RoomObject(
  "tv",
  "An old looking TV, you're not sure how to turn it on..."
);

let table = new RoomObject(
  "table",
  "You take a closer look at the end table and you decide to open the drawer. \
Inside you see a remote control."
);

let rabbit = new RoomObject(
  "rabbit",
  "It's a fluffy black and white rabbit. It's very cute. It's looking at you with big wondering eyes."
);

let hole = new RoomObject(
  "hole",
  "It's the rabbit's hole."
);

let desk = new RoomObject(
  "desk",
  "It's an old fashioned, but sturdy desk. You decide to take a look in the drawer. \
You see a note inside.\n\
The note says E = 7"
);

let computer = new RoomObject(
  "computer",
  "It's one of those older computers.\n\n\
On the screen you see it saying: Please insert disk in drive A:"
);

let safe = new RoomObject(
  "safe",
  "An old looking safe -  looks like it needs a code\n\
On top of the keypad you can see 4 big capital letters that spell out: \
S . A . F . E "
);

let master = new RoomObject(
  "master",
  "You come closer to the martial art master. He's still silent and staring at you. \
As you get closer, the martial artist quickly pushes you away, and with a secret techique, \
slams you to the ground..."
);

let agent = new RoomObject(
  "agent",
  "You get closer to the agent, he starts talking..."
);

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
};

let package = new Item("package", " Brown Package");

let remote = new Item("remote", " Remote Control");

let pill = new Item("pill", " Blue Pill");

let disk = new Item("disk", " Floppy Disk");

let carrot = new Item("carrot", " Carrot");

let kung = new Item("kung", " Kung-Fu Skills");

let key = new Item("key", " Golden Key");

let itemLookUp = {
  package,
  remote,
  pill,
  disk,
  carrot,
  kung,
  key,
};

//Creating the locations
let room1 = new Location(
  "Main Room",
  "a room with bright white walls.",
  [" a mirror on the wall"],
  [" a door to the east", " a door to the south", " a door to the north"],
  [" Brown Package"]
);

let room2 = new Location(
  "second room",
  "a living room with a tv and a red sofa.",
  [" a red sofa", " a tv", " a small end table with a drawer"],
  [" a door to the west", " a door to the south", " a door to the east"],
  []
);

let room3 = new Location(
  "third room",
  "a small room with a black and white rabbit and its rabbit hole.\n\n\
On the wall someone has written down F = 8",
  [" a black and white rabbit", " a rabbit hole"],
  [" a door to the west", " a door to the south-west"],
  []
);

let room4 = new Location(
  "the fourth room",
  "an office room.",
  [" a desk with a drawer", " an old desktop computer", " a safe"],
  [" a door to the north-east", " a door to the north", " a door to the west"],
  []
);

let room5 = new Location(
  "the fifth room",
  "a dojo.",
  [" a martial arts master"],
  [" a door to the east", " a door to the north"],
  []
);

let room6 = new Location(
  "End City",
  "a city in ruins",
  [" an agent"],
  [" a door to the south"],
  []
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
  room3: ["west", "southwest"],
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
  return inputToSani
    .toLowerCase()
    .replaceAll(" ", "")
    .replaceAll("-", "")
    .replaceAll(".", "");
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

function keyPress() {
  log("\n> Press any key to continue...");
}

function notSure() {
  log("\nNot sure what you're trying to do...");
}

function test() {
  room1Loop = 0;
  room2Loop = 0;
  room3Loop = 0;
  room4Loop = 0;
  room5Loop = 0;
  room6Loop = 0;
  doorLoop = 0
  checkLoop = 0;
  x = 2;
  y = 2;
  playerName = "test";
  game();
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
  let menuInput = await ask("\n\
    Welcome to the Xirtam!\n\n\
- Type in 1 to play\n\
- Type in 2 for instructions (recommended before first playthrough)\n\n\
Input: > ");
  if (menuInput != 1 && menuInput != 2) {
    log("\nInput 1 or 2")
    setTimeout(mainMenu, 1500)
  } else if (menuInput == 1){
    start();
  } else if (menuInput == 2){
    tutorial()
  }
}

async function tutorial(){
  console.clear()
  log(`Thank you for trying my game. Here's a quick guide on how to play.\n\n\
There are 4 main actions you can write down in each room: "go", "inspect", "take" and "use".\n\n\
"go" - lets you move to another room - north, east, south, west.\n\
Example: "go east" or "go door south-west"\n\n\
"inspect" - lets you take a closer look at objects, like furniture for instance, around the room.\n\
Example: "inspect mirror" or "inspect the small table"\n\n\
"take" - lets you pick up items from the room's inventory and place it in your own inventory.\n\
Example: "take key"\n\n\
"use" - if (and only if!) an item is in your inventory, you can then "use" it.\n\
Example: "use key"\n\n\
I hope you enjoy your playthrough!\n\n\
> Press any key to return to the main menu...`)
  await keypress()
  mainMenu()
}

async function start() {
  console.clear();
  playerName = await ask("What is your name?\n\
> ");
  if (playerName === ""){
    console.log(playerName)
    start()
  } else {
    playerName = capitalize(playerName);

    let confirm = await ask(`\nYour name is ${playerName}? Y or N\n\
> `);
    confirm = sani(confirm);
    while (confirm !== "y" && confirm !== "n") {
      confirm = await ask(`Answer with Y or N \n\
> `);
    }
    if (confirm === "y") {
      console.clear();
      log(`\n Ok, your name is ${playerName}\n\n\
Press any key when you're ready to start the game!`);
      await keypress();
      introSequence();
    } else {
      start();
    }
  }  
}

async function introSequence() {
  console.clear();
  setTimeout(() => {
    log(`Wake up, ${playerName}...`);
  }, 2500);
  setTimeout(() => {
    console.clear();
  }, 6000);
  setTimeout(() => {
    log("The Xirtam has you...");
  }, 8000);
  setTimeout(() => {
    console.clear();
  }, 12000);
  setTimeout(() => {
    log("Follow the black and white rabbit.");
  }, 15000);
  setTimeout(() => {
    console.clear();
  }, 19500);
  setTimeout(() => {
    log(`Knock, knock, ${playerName}.`);
  }, 21500);
  setTimeout(() => {
    console.clear();
  }, 24500);
  setTimeout(() => {
    log("\n\n     *KNOCK* *KNOCK*");
  }, 26500);
  setTimeout(() => {
    console.clear();
  }, 30000);
  setTimeout(game, 32000);
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

  console.clear();
  if (locationCurrent === "room1" && room1Loop === 0) {
    room1Loop++;
    log("You wake up to the sound of somebody knocking \
at the door, you're in a bright room with white walls \
and your head hurts...\n\n\
You don't remember how you fell asleep or how you got here...\n\n\
You hear the sound of something falling on the ground: a package. \
The person who knocked must have passed it through a slot in a door.\n\n\
As you stand up, you startle a black and white rabbit who thumps and then hightails it through \
a small hole in the wall going east.");
    keyPress();
    await keypress();
  }

  if (locationCurrent === "room2" && room2Loop === 0) {
    room2Loop++;
    log("As you enter a room, you can see the black and white rabbit \
continuing to hop towards the east in panic.\n\n\
The room is very odd: it's entirely empty except for a red sofa and an old \
CRT TV on a small end table...");
    keyPress();
    await keypress();
  }

  if (locationCurrent === "room3" && room3Loop === 0) {
    room3Loop++;
    log("You enter a tiny room, where you can see the black and white rabbit that was running away.\n\n\
As you enter, it jumps into its rabbit hole, flattens its ears, and looks at you timidly.");
    keyPress();
    await keypress();
  }

  if (locationCurrent === "room4" && room4Loop === 0) {
    room4Loop++;
    log("You enter a room that looks like an office room\n\
In it, there's a desk with an ancient IBM desktop computer. \
In the corner of the room, you also notice a safe.");
    keyPress();
    await keypress();
  }

  if (locationCurrent === "room5" && room5Loop === 0) {
    room5Loop++;
    log("The room you enter is a dojo.\n\
You're surprised to see someone is here, standing in the center, \
who seems to be a martial arts master.\n\
He doesn't say anything - he's staring at you, silently.");
    keyPress();
    await keypress();
  }

  if (locationCurrent === "room6" && room6Loop === 0) {
    room6Loop++;
    log("Pass the door, you see a whole city entirely in ruins...\n\n\
In the middle stands a person wearing a suit, he looks like an agent...");
    keyPress();
    await keypress();
  }

  console.clear();
  log(`You are in the ${locationLookUp[locationCurrent].name}, \
${locationLookUp[locationCurrent].description}\n`);
  log(`Objects around you that you can [inspect]:\
${locationLookUp[locationCurrent].objectsInRoom}...\n`);
  if (locationLookUp[locationCurrent].roomInventory.length !== 0) {
    log(`Items in the room that you can [take]:\
${locationLookUp[locationCurrent].roomInventory}\n`);
  }
  log(`Doors you can [go] through:${locationLookUp[locationCurrent].doors}\n`);
  if (playerInventory.length !== 0) {
    log(`Objects you can [use] in your inventory:${playerInventory}\n`);
  }

  let answer = await ask("What would you like to do?\n\n\
> ");

  saniAnswer = sani2(answer);
  let splitAnswer = saniAnswer.split(" ");
  let word1 =""
  let numberOfDir = 0
  checkLoop = 0;

  if (splitAnswer.includes("inspect")) {
    if (objectList.some((v) => splitAnswer.toString().includes(v))) {
      for (let word of splitAnswer) {
        if (objectList.includes(word)) {
          if (
            locationLookUp[locationCurrent].objectsInRoom
              .toString()
              .includes(objectLookUp[word].name)
          ) {
            console.clear();
            objectLookUp[word].describe();
            break;
          } else {
            notSure();
            setTimeout(game, 2000);
          }
        }
      }
    } else {
      notSure();
      setTimeout(game, 2000);
    }
  } else if (splitAnswer.includes("go")) {
    if (directions.some((v) => splitAnswer.toString().includes(v))) {

//over complicated way of making sure a space between two directions comes back as one word :l
      for (let word of splitAnswer) {
        if (directions.includes(word) && numberOfDir===0) {
          numberOfDir++
          word1 = word
        } else if (directions.includes(word) && numberOfDir===1) {
          numberOfDir++
          word1 = word1 + word
        }
      }
      if (doorLoop === 0 && locationCurrent === "room1" && word1 === "north") {
        log("\nThis door won't open... there's a golden lock on it...");
        setTimeout(game, 2000);
      } else if (directions.includes(word1)) {
        if (locationStates[locationCurrent].includes(word1)) {
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
          log(`\nYou're going through the door heading ${sani(directionHeaded)}.`);
          setTimeout(game, 2000);
        } else if (checkLoop === 0) {
          log("\nYou can't go in that direction...");
          setTimeout(game, 2000);
        } else {
          notSure();
          setTimeout(game, 2000);
        }
      }
    } else {
      notSure();
      setTimeout(game, 2000);
    }
  } else if (splitAnswer.includes("use")) {
    if (itemList.some((v) => splitAnswer.toString().includes(v))) {
      for (let word of splitAnswer) {
        if (itemList.includes(word)) {
          if (playerInventory.includes(itemLookUp[word].name2)){
            if (itemLookUp[word].name) {
                itemLookUp[word].use();
            } else {
              notSure();
              setTimeout(game, 2000);    
            }
          } else {
            notSure();
            setTimeout(game, 2000);
          }
        }
      }
    } else {
      notSure();
      setTimeout(game, 2000);
    }
  } else if (splitAnswer.includes("take")) {
    if (itemList.some((v) => splitAnswer.toString().includes(v))) {
      for (let word of splitAnswer) {
        if (itemList.includes(word)) {
          if (locationLookUp[locationCurrent].roomInventory.includes(itemLookUp[word].name2)) {
            if (itemLookUp[word].name) {
              log(`\nYou pick up the${itemLookUp[word].name2}`);
              playerInventory.push(itemLookUp[word].name2);
              let i = locationLookUp[locationCurrent].roomInventory.indexOf(
                itemLookUp[word].name2
              );
              locationLookUp[locationCurrent].roomInventory.splice(i, 1);
              setTimeout(game, 2000);
            } else {
              notSure();
              setTimeout(game, 2000);
            }
          } else {
            notSure();
            setTimeout(game, 2000);
          }
        }
      }
    } else {
      notSure();
      setTimeout(game, 2000);
    }
  } else {
    notSure();
    setTimeout(game, 2000);
  }
}

// test()
mainMenu();
