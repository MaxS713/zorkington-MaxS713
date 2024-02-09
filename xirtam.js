/* eslint-disable */

// boilerplate needed for enabling readline inputs
const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// found this online to wrap the text to 80 characters: It just works!
const wrap = (s) => s.replace(/(?![^\n]{1,80}$)([^\n]{1,80})\s/g, "$1\n");

// function to print and wrap text
function displayText(string) {
  console.log(wrap(string));
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

// I print these phrases a lot, so these functions make it easy to call them
function pressEnterText() {
  displayText("\n> Press enter to continue...");
}
function notSureText() {
  displayText("\nNot sure what you're trying to do...");
}

// Functions I'll need

// function given to await an input
function ask(questionText) {
  return new Promise((resolve) => {
    readlineInterface.question(questionText, resolve);
  });
}

// Functions to capitalize a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Function to 'sanitize' inputs - extra spaces are removed and
// all punctuation marks are also removed...
// => found this beautiful length of punctuation marks online
// that captures them all!
function sanitizeInput(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/['!'#$%&\\'()*+,\-./:;<=>?@[\\\]^_`{|}~']/g, "");
}

// Variables I'll need throughout the game
let playerName;
let currentLocation;
let room2Loop = 0;
let doorLoop = 0;
let carrotLoop = 0;
let tableLoop = 0;
let masterLoop = 0;
let safeLoop = 0;
let x = 2;
let y = 2;

const validDirections = [
  "east",
  "south",
  "north",
  "west",
  "southwest",
  "southeast",
  "northeast",
  "northwest",
];

const playerInventory = [];

// creating the three class I'll need for objects, locations and items
// with their different customized methods depending
// on how the items interact with the game

// Location Class constructor with different attributes
class Location {
  constructor(
    name,
    description,
    objectsInRoom,
    doorsInRoom,
    roomInventory,
    firstEncounter
  ) {
    this.name = name;
    this.description = description;
    this.objectsInRoom = objectsInRoom;
    this.doorsInRoom = doorsInRoom;
    this.roomInventory = roomInventory;
    this.firstEncounter = firstEncounter;
  }
}

// creating the rooms with their different attributes
// name, description, furniture in the room, items in the room,
// door you can go through and if it's the room first encounter
const room1 = new Location(
  "Main Room",
  "a room with bright white walls.",
  [" a mirror on the wall"],
  [" a door to the east", " a door to the south", " a door to the north"],
  [" Brown Package"],
  true
);

const room2 = new Location(
  "second room",
  "a living room with a tv and a red sofa.",
  [" a red sofa", " a tv", " a small end table with a drawer"],
  [" a door to the west", " a door to the south", " a door to the east"],
  [],
  true
);

const room3 = new Location(
  "third room",
  "a small room with a black and white rabbit and its rabbit hole.\n\n" +
    "On the wall someone has written down F = 8",
  [" a black and white rabbit", " a rabbit hole"],
  [" a door to the west", " a door to the south-west"],
  [],
  true
);

const room4 = new Location(
  "the fourth room",
  "an office room.",
  [" a desk with a drawer", " an old desktop computer", " a safe"],
  [" a door to the north-east", " a door to the north", " a door to the west"],
  [],
  true
);

const room5 = new Location(
  "the fifth room",
  "a dojo.",
  [" a martial arts master"],
  [" a door to the east", " a door to the north"],
  [],
  true
);

const room6 = new Location(
  "End City",
  "a city in ruins",
  [" an agent"],
  [" a door to the south"],
  [],
  true
);

// Look up table for the locations
const locationLookUp = {
  room1,
  room2,
  room3,
  room4,
  room5,
  room6,
};

// State machine for the locations
// where you can or cannot go
// from one room to another
const locationStates = {
  room1: ["east", "south", "north"],
  room2: ["west", "east", "south"],
  room3: ["west", "southwest"],
  room4: ["northeast", "north", "west"],
  room5: ["east", "north"],
  room6: ["south"],
};

// Class for the objects(furniture) in each room
class RoomObject {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  async describe() {
    // The method prints the description of the object
    displayText(`${this.description}`);

    // the function changes for objects that have special outcome
    if (this.name === "table" && tableLoop === 0) {
      tableLoop += 1;
      displayText(
        "\nYou take a closer look at the end table and " +
          "you decide to open the drawer. \n" +
          "Inside you see a remote control."
      );
      // for instance looking at the table adds the remote control to the room
      locationLookUp[currentLocation].roomInventory.push(" Remote Control");
      pressEnterText();
      await keypress();
      game();
      // special text outcome for the rabbit hole
      // (before the carrot given to the rabbit event happened)
    } else if (this.name === "hole" && carrotLoop === 0) {
      displayText(
        "\nYou can see something shining inside, " +
          "but you can't reach it because the rabbit is " +
          "in the way and rabbits are stubborn."
      );
      pressEnterText();
      await keypress();
      game();
      // special text outcome for the kung-fu master
      // if you haven't interacted with him yet
    } else if (this.name === "master" && masterLoop === 0) {
      displayText(
        "\nAs you get closer, the martial artist quickly pushes you away, " +
          "and with a secret technique, slams you to the ground..."
      );
      pressEnterText();
      await keypress();
      game();
      // special outcome that checks the code for the safe,
      // if it hasn't been opened yet
    } else if (this.name === "safe" && safeLoop === 0) {
      const codeInput = await ask("\nWhat code do you input? > ");
      if (codeInput.replaceAll(' ', '') === "3587") {
        safeLoop += 1;
        displayText("\nThe safe opens!");
        displayText("You see a Floppy Disk Inside...");
        pressEnterText();
        await keypress();
        locationLookUp[currentLocation].roomInventory.push(disk.inventoryName);
        game();
      } else {
        displayText("\nThat didn't seem to work...");
        pressEnterText();
        await keypress();
        game();
      }
      // final outcome for interacting with the agent
    } else if (this.name === "agent") {
      displayText(`\n'Hello ${playerName}!!\n\n\
So good of you to join us...\n\n\
Welcome to the desert of the REAL!'\n\n\n\
TO BE CONTINUED...\n\n\
Thanks for playing!\n\n\
> Press any key to exit.`);
      await keypress();
      console.clear();
      mainMenu();
    } else {
      pressEnterText();
      await keypress();
      game();
    }
  }
}

// creations of the objects and furniture in each room,
// with a basic description for when they're interacted with
const mirror = new RoomObject(
  "mirror",
  "You look into the mirror... You look different.\n" +
    "You're wearing a long black robe and your hair has changed."
);

const sofa = new RoomObject(
  "red sofa",
  "This sofa looks comfy, you sit in it and relax. " +
    "Then you realize you might have more important things to do!"
);

const tv = new RoomObject(
  "tv",
  "An old looking TV, you're not sure how to turn it on..."
);

const table = new RoomObject("table", "It's a small end table.");

const rabbit = new RoomObject(
  "rabbit",
  "It's a fluffy black and white rabbit. It's very cute. " +
    "It's looking at you with big wondering eyes."
);

const hole = new RoomObject("hole", "It's the rabbit's hole.");

const desk = new RoomObject(
  "desk",
  "It's an old fashioned, but sturdy desk. " +
    "You decide to take a look in the drawer." +
    "You see a note inside.\n\n" +
    "The note says E = 7"
);

const computer = new RoomObject(
  "computer",
  "It's one of those older computers.\n\n" +
    "On the screen you see it saying: Please insert disk in drive A:"
);

const safe = new RoomObject(
  "safe",
  "An old looking safe -  looks like it needs a code\n" +
    "On top of the keypad you can see 4 big capital " +
    "letters that spell out: \n\n" +
    "S . A . F . E "
);

const master = new RoomObject(
  "master",
  "You come closer to the martial art master. " +
    "He's is silent and staring at you."
);

const agent = new RoomObject(
  "agent",
  "You get closer to the agent, he starts talking..."
);

// table lookup for the objects
const objectLookUp = {
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

// Class for the items the player can pick up and use
class Item {
  constructor(shortName, inventoryName) {
    this.shortName = shortName;
    this.inventoryName = inventoryName;
  }

  async use() {
    // what every item do when the method use is applied to them
    if (this.shortName === "package") {
      // remove the item from the player's inventory when used
      // by looking up its index in the inventory and then 'splicing' it
      const indexToRemove = playerInventory.indexOf(this.inventoryName);
      playerInventory.splice(indexToRemove, 1);
      console.clear();

      // long text for reading the letter inside the brown package
      displayText(
        "You open the brown package, inside you see an envelope that says:\n\n" +
          "'Welcome to the Xirtam.'\n\n" +
          "There's a small box, you open it and find " +
          "two pills, a red pill and a blue pill.\n" +
          "You open the envelope and start reading the letter inside..."
      );
      pressEnterText();
      await keypress();
      console.clear();
      displayText(
        `Hello ${playerName},\n\n` +
          "Let me tell you why you're here. You know something. " +
          "What you know, you can't explain. But you feel it. " +
          "You felt it your entire life: " +
          "something's wrong with the world. " +
          "You don't know what, but it's there. " +
          "Like a splinter in your mind, driving you mad.\n\n" +
          "The Xirtam? Do you want to know what it is?"
      );
      pressEnterText();
      await keypress();
      console.clear();
      displayText(
        "The Xirtam is everywhere. It is all around us. " +
          "Even now, in this very room. " +
          "You can see it when you look out your window " +
          "or when you turn on your television. " +
          "You can feel it when you go to work, when you " +
          "go to church, when you pay your taxes. " +
          "It is the world that has been, pulled over your " +
          "eyes to blind you from the truth. " +
          "The truth that you are a slave. Like everyone else, " +
          "you were born into bondage... " +
          "Born into a prison that you cannot smell or taste or touch.\n\n" +
          "A prison ... for your mind."
      );
      pressEnterText();
      await keypress();
      console.clear();
      displayText(
        "Unfortunately, no one can be simply told what the Xirtam is. " +
          "You have to see it for yourself.\n\n" +
          "This is your last chance. After this, " +
          "there is no turning back.\n\n" +
          "You take the blue pill, the story ends, " +
          "you wake up in your bed and believe " +
          "whatever you want to believe.\n\n" +
          "You take the red pill, you stay in Wonderland, " +
          "and I show you how deep " +
          "the black and white rabbit hole goes...\n\n" +
          "Also be sure to remember this: S = 3"
      );

      // interaction that lets the user choose the blue pill or the red pill
      let answer = await ask(
        "\nDo you want to take the Blue Pill or the Red Pill? > "
      );
      answer = sanitizeInput(answer);
      while (answer !== "blue" && answer !== "red") {
        answer = await ask("Answer Blue or Red \n> ");
        answer = sanitizeInput(answer);
      }
      if (answer === "blue") {
        // the blue pill ends the game
        displayText("\nYou swallow the Blue pill...");
        pressEnterText();
        await keypress();
        console.clear();
        displayText(
          "You wake up in your bed, you have no memory " +
            "of what happened to you.\n" +
            "You resume your mundane life - program writer" +
            "for a respectable software company.\n\n" +
            "You have a social security number. You pay your taxes." +
            "And you help your landlady carry out her garbage.\n\n" +
            "As you head outside to go to work, you think to yourself:\n" +
            "You know that road. You know exactly where it ends.\n" +
            "And you somehow know that, things could have been different " +
            "this is not not where you want to be...\n\n\n" +
            "                      THE END"
        );
        await keypress();
        console.clear();
        mainMenu();
      } else if (answer === "red") {
        console.clear();
        displayText(
          "\nYou swallow the Red pill...\n\n" +
            "(but you also decide to keep the blue pill in your back pocket " +
            "in case you made the wrong decision and want to exit the game.)"
        );
        pressEnterText();
        await keypress();
        console.clear();
        displayText(
          "Remember ...\n\n" +
            "... all I'm offering is the truth, nothing more.\n\n" +
            "You put the letter and the blue pill " +
            "in your pocket and carry on..."
        );
        playerInventory.push(" Blue Pill");
        playerInventory.push(" Letter");
        pressEnterText();
        await keypress();
        game();
      }
      // using the letter goes through the text again
      // I should've stored all the text in a variable, but a copy paste works,
      // although redundant
    } else if (this.shortName === "letter") {
      console.clear();
      displayText(
        "You go through the letter again...\n\n" +
          `Hello ${playerName},\n\n` +
          "Let me tell you why you're here. You know something. " +
          "What you know, you can't explain. But you feel it." +
          "You felt it your entire life: " +
          "something's wrong with the world. " +
          "You don't know what, but it's there. " +
          "Like a splinter in your mind, driving you mad.\n\n" +
          "The Xirtam? Do you want to know what it is?"
      );
      pressEnterText();
      await keypress();
      console.clear();
      displayText(
        "The Xirtam is everywhere. It is all around us. " +
          "Even now, in this very room. " +
          "You can see it when you look out your window or " +
          "when you turn on your television. " +
          "You can feel it when you go to work, when you go to " +
          "church, when you pay your taxes. " +
          "It is the world that has been, pulled over your eyes " +
          "to blind you from the truth. " +
          "The truth that you are a slave. Like everyone else, " +
          "you were born into bondage... " +
          "Born into a prison that you cannot smell or taste or touch.\n\n" +
          "A prison ... for your mind."
      );
      pressEnterText();
      await keypress();
      console.clear();
      displayText(
        "Unfortunately, no one can be simply told what the Xirtam is. " +
          "You have to see it for yourself.\n\n" +
          "This is your last chance. After this, " +
          "there is no turning back.\n\n" +
          "You take the blue pill, the story ends, " +
          "you wake up in your bed and believe " +
          "whatever you want to believe.\n\n " +
          "You take the red pill, you stay in Wonderland, " +
          "and I show you how deep " +
          "the black and white rabbit hole goes...\n\n" +
          "Also be sure to remember this: S = 3"
      );
      pressEnterText();
      await keypress();
      game();
      // the user can still use the blue pill in game, and that ends the game
    } else if (this.shortName === "pill") {
      console.clear();
      displayText("\nYou swallow the Blue pill...");
      pressEnterText();
      await keypress();
      console.clear();
      displayText(
        "You wake up in your bed, you have no memory " +
          "of what happened to you.\n" +
          "You resume your mundane life - program writer " +
          "for a respectable software company.\n\n" +
          "You have a social security number. You pay your taxes. " +
          "And you help your landlady " +
          "carry out her garbage.\n\n" +
          "As you head outside to go to work, you think to yourself:\n" +
          "You know that road. You know exactly where it ends.\n" +
          "And you somehow know that, things could have been different " +
          "this is not not where you want to be...\n\n\n" +
          "                       THE END"
      );
      await keypress();
      console.clear();
      mainMenu();

      // using the remote control
    } else if (this.shortName === "remote") {
      // if the item isn't used in its proper room
      // the game doesn't allow it
      if (currentLocation !== "room2") {
        displayText("\nYou can't use that here...");
        setTimeout(game, 2000);
      } else {
        console.clear();
        // text that appears when using the remote control
        displayText(
          "You push the power button of the remote and the TV turns on " +
            "and a tape starts playing.\n\n" +
            "A person dressed in leather and wearing sunglasses " +
            "appears and start talking...\n\n" +
            `Hello ${playerName}, I've been expecting you.\n\n` +
            "I am Suehprom. It's an honor to meet you.\n\n" +
            "Welcome to the Construct. It's a loading program. " +
            "You're inside a computer program, your clothes " +
            "are different, your hair has changed. " +
            "None of this is real. Do you think that's air " +
            "you're breathing now?\n\n" +
            "What is 'real'? If we're talking about what you can feel, " +
            "what you can smell, taste and see. Then 'real' is simply " +
            "electrical signals interpreted by your brain.\n\n" +
            "The world as it was at the beginning of the 21th century " +
            "exists now only as part of a neural-interactive " +
            "simulation that we call the Xirtam.\n" +
            `You've been living in a dream world, ${playerName}.\n\n` +
            "Come join us and learn the truth. \n\n" +
            "To do this, all you need to know to know " +
            "right now is A = 5, it will make sense soon…"
        );
        pressEnterText();
        await keypress();
        game();
      }
      //  text that appears when using the floppy disk
    } else if (this.shortName === "disk") {
      if (currentLocation !== "room4") {
        displayText("\nYou can't use that here...");
        setTimeout(game, 2000);
      } else {
        const indexToRemove = playerInventory.indexOf(this.inventoryName);
        playerInventory.splice(indexToRemove, 1);
        console.clear();
        displayText(
          "You insert the disk into the computer...\n\n" +
            "A folder called 'kung-fu' appears, " +
            "you open it, a whole bunch of videos " +
            "about kung fu start playing...\n\n" +
            "You sit there for about 2 hours.\n\n" +
            "At the end, you tell to yourself: 'I know Kung Fu.'"
        );
        playerInventory.push(kung.inventoryName);
        pressEnterText();
        await keypress();
        game();
      }
      //  text that appears when using kung fu
    } else if (this.shortName === "kung") {
      if (currentLocation !== "room5") {
        displayText("\nYou can't use that here...");
        setTimeout(game, 2000);
      } else {
        masterLoop += 1;
        let indexToRemove = playerInventory.indexOf(this.inventoryName);
        playerInventory.splice(indexToRemove, 1);
        console.clear();
        displayText(
          "You now know Kung-Fu and have the confidence " +
            "to take on the martial arts master,\n" +
            "He tries to push you away, but you block his arms. " +
            "There ensues a long fight of about 15 minutes, " +
            "both of you returning blows for blows.\n\n" +
            "Then suddenly he blocks your final punch and says:\n" +
            "'Stop!... Enough... apologies about all of that, " +
            "I just needed to be sure that you were the One.\n\n" +
            "You do not truly know someone, until you fight them.'\n\n" +
            "He hands you a carrot and says, 'Here, take this. " +
            "I have a feeling you will need it.'\n\n" +
            "'Why on earth did he give me a carrot?' " +
            "you think to yourself.\n\n" +
            "The martial arts master has resumed " +
            "his position and says nothing..."
        );
        playerInventory.push(carrot.inventoryName);
        pressEnterText();
        await keypress();
        game();
      }
      //  text that appears when using the carrot
    } else if (this.shortName === "carrot") {
      if (currentLocation !== "room3") {
        displayText("\nYou can't use that here...");
        setTimeout(game, 2000);
      } else {
        carrotLoop += 1;
        let indexToRemove = playerInventory.indexOf(this.inventoryName);
        playerInventory.splice(indexToRemove, 1);
        console.clear();
        displayText(
          "You hand the carrot to the black and white rabbit...\n\n" +
            "The rabbit inspects it carefully. " +
            "Then suddenly its eyes go wide! " +
            "It raises its ears, bites into the carrot, " +
            "takes it, and runs away!\n\n" +
            "You can now see the item that was in its hole: it's a golden key."
        );
        locationLookUp[currentLocation].roomInventory.push(key.inventoryName);
        pressEnterText();
        await keypress();
        game();
      }
      //  text that appears when using the key
      // also this unlocks the door if used in the proper room
    } else if (this.shortName === "key") {
      if (currentLocation !== "room1") {
        displayText("\nYou can't use that here...");
        setTimeout(game, 2000);
      } else {
        const indexToRemove = playerInventory.indexOf(this.inventoryName);
        playerInventory.splice(indexToRemove, 1);
        displayText(
          "\nYou use the golden key on the door heading north...\n" +
            "It unlocks..."
        );
        doorLoop += 1;
        pressEnterText();
        await keypress();
        game();
      }
    } else {
      pressEnterText();
      await keypress();
      game();
    }
  }
}

// creating the items that can be in the inventory
const brownPackage = new Item("package", " Brown Package");
const letter = new Item("letter", " Letter");
const remote = new Item("remote", " Remote Control");
const pill = new Item("pill", " Blue Pill");
const disk = new Item("disk", " Floppy Disk");
const carrot = new Item("carrot", " Carrot");
const kung = new Item("kung", " Kung-Fu Skills");
const key = new Item("key", " Golden Key");

// lookup table for the items
const itemLookUp = {
  package: brownPackage,
  letter,
  remote,
  pill,
  disk,
  carrot,
  kung,
  key,
};

// actual start of the game
async function game() {
  // I created a system of coordinates x and y - when you move east x+= 1
  // and when you move north y+= 1, etc...
  // x and y define which current room you're in
  if (x === 2 && y === 2) {
    currentLocation = "room1";
  } else if (x === 3 && y === 2) {
    currentLocation = "room2";
  } else if (x === 4 && y === 2) {
    currentLocation = "room3";
  } else if (x === 3 && y === 1) {
    currentLocation = "room4";
  } else if (x === 2 && y === 1) {
    currentLocation = "room5";
  } else if (x === 2 && y === 3) {
    currentLocation = "room6";
  }

  // some intros to each room that only play once on
  // the first time you enter them (when the firstEncounter value is 'false')
  console.clear();

  // intro to the 1st room
  if (
    currentLocation === "room1" &&
    locationLookUp[currentLocation].firstEncounter === true
  ) {
    locationLookUp[currentLocation].firstEncounter = false;
    displayText(
      "You wake up to the sound of somebody knocking " +
        "at the door, you're in a bright room with white walls " +
        "and your head hurts...\n\n" +
        "You don't remember how you fell asleep or how you got here...\n\n" +
        "You hear the sound of something falling " +
        "on the ground: a brown package. " +
        "The person who knocked must have passed it " +
        "through a slot in a door.\n\n" +
        "As you stand up, you startle a black and white " +
        "rabbit who thumps and " +
        "then hightails it through a small hole in the wall going east."
    );
    pressEnterText();
    await keypress();
  }

  // intro to the 2nd room
  if (
    currentLocation === "room2" &&
    locationLookUp[currentLocation].firstEncounter === true &&
    room2Loop !== 42
  ) {
    locationLookUp[currentLocation].firstEncounter = false;
    displayText(
      "As you enter a room, you can see the black and white rabbit " +
        "continuing to hop towards the east in panic.\n\n" +
        "The room is very odd: it's entirely empty " +
        "except for a red sofa and an old " +
        "CRT TV on a small end table..."
    );
    pressEnterText();
    await keypress();
  }
  // exception to the intro to the 2nd room if coming from the east
  // no encounter with the rabbit
  if (
    currentLocation === "room2" &&
    locationLookUp[currentLocation].firstEncounter === true &&
    room2Loop === 42
  ) {
    locationLookUp[currentLocation].firstEncounter = false;
    displayText(
      "The room is very odd: it's entirely empty " +
        "except for a red sofa and an old " +
        "CRT TV on a small end table..."
    );
    pressEnterText();
    await keypress();
  }

  // intro to the 3rd room
  if (
    currentLocation === "room3" &&
    locationLookUp[currentLocation].firstEncounter === true
  ) {
    locationLookUp[currentLocation].firstEncounter = false;
    room2Loop = 42;
    displayText(
      "You enter a tiny room, where you can see the " +
        "black and white rabbit that was running away.\n\n" +
        "As you enter, it jumps into its rabbit hole, " +
        "flattens its ears, and looks at you timidly."
    );
    pressEnterText();
    await keypress();
  }

  // intro to the 4th room
  if (
    currentLocation === "room4" &&
    locationLookUp[currentLocation].firstEncounter === true
  ) {
    locationLookUp[currentLocation].firstEncounter = false;
    displayText(
      "You enter a room that looks like an office room\n\n" +
        "In it, there's a desk with an ancient IBM desktop computer. " +
        "In the corner of the room, you also notice a safe."
    );
    pressEnterText();
    await keypress();
  }

  // intro to the 5th room
  if (
    currentLocation === "room5" &&
    locationLookUp[currentLocation].firstEncounter === true
  ) {
    locationLookUp[currentLocation].firstEncounter = false;
    displayText(
      "The room you enter is a dojo.\n\n" +
        "You're surprised to see someone is here, standing in the center, " +
        "who seems to be a martial arts master.\n\n" +
        "He doesn't say anything - he's staring at you, silently."
    );
    pressEnterText();
    await keypress();
  }

  // intro to the 6th room
  if (
    currentLocation === "room6" &&
    locationLookUp[currentLocation].firstEncounter === true
  ) {
    locationLookUp[currentLocation].firstEncounter = false;
    displayText(
      "Pass the door, you see a whole city entirely in ruins...\n\n" +
        "In the middle stands a person wearing " +
        "a suit, he looks like an agent..."
    );
    pressEnterText();
    await keypress();
  }

  // this is the main screen that shows for each room
  console.clear();

  // displays the current location and its description
  displayText(`You are in the ${locationLookUp[currentLocation].name}, \
${locationLookUp[currentLocation].description}\n`);

  // displays the current location's objects
  displayText(`Objects around you that you can [inspect]:\
${locationLookUp[currentLocation].objectsInRoom}.\n`);

  // if any, a.k.a .roomInventory.length !==0,
  // shows any items present in the room
  if (locationLookUp[currentLocation].roomInventory.length !== 0) {
    displayText(`Items in the room that you can [take]:\
${locationLookUp[currentLocation].roomInventory}\n`);
  }

  // display doors the player can take
  displayText(
    "Doors you can [go] through:" +
      `${locationLookUp[currentLocation].doorsInRoom}\n`
  );

  // if any, a.k.a .playerInventory.length !==0,
  // shows any items present in the player's inventory
  if (playerInventory.length !== 0) {
    displayText(
      `Objects in your inventory that you can [use]:${playerInventory}\n`
    );
  }

  // here the player can input his actions...
  const answer = await ask("What would you like to do?\n\n> ");

  // the answer is 'sanitized'
  // the answer is also 'split' at every space
  // into an array of each words it contains
  const saniAnswer = sanitizeInput(answer);
  const splitAnswer = saniAnswer.split(" ");

  let object = "";
  let numberOfDirections = 0;

  // the player can 'inspect', 'use', 'take', 'drop' and 'go'
  // first it checks if one of the action word is in the answer
  if (splitAnswer.includes("inspect")) {
    // if the target needed is in the answer
    //  it's assigned to a variable
    object = splitAnswer.find((word) => objectLookUp[word]);

    // checks if the object was in the answer
    if (objectLookUp[object]) {
      // checks if the object is in the current room
      if (
        locationLookUp[currentLocation].objectsInRoom
          .toString()
          .includes(objectLookUp[object].name)
      ) {
        console.clear();
        // if the conditions are met a method is called on the object
        objectLookUp[object].describe();
        // if none of these conditions are met then the game
        // lets the user know and continues
      } else {
        notSureText();
        setTimeout(game, 2000);
      }
    } else {
      notSureText();
      setTimeout(game, 2000);
    }

    // similar checks for every action word
    // action to use an item
  } else if (splitAnswer.includes("use")) {
    object = splitAnswer.find((word) => itemLookUp[word]);
    // checks if the target was in the answer
    if (itemLookUp[object]) {
      // checks if the target item was in the player's inventory
      if (playerInventory.includes(itemLookUp[object].inventoryName)) {
        itemLookUp[object].use();
      } else {
        notSureText();
        setTimeout(game, 2000);
      }
    } else {
      notSureText();
      setTimeout(game, 2000);
    }

    // action to pick up an item
  } else if (splitAnswer.includes("take")) {
    object = splitAnswer.find((word) => itemLookUp[word]);
    if (itemLookUp[object]) {
      const itemToTake = itemLookUp[object].inventoryName;
      const currentRoomInventory =
        locationLookUp[currentLocation].roomInventory;
      if (currentRoomInventory.includes(itemToTake)) {
        // when the player 'takes an object'
        // the object is 'pushed' into his inventory
        // the item is removed from the room's inventory
        displayText(`\nYou pick up the${itemToTake}`);
        playerInventory.push(itemToTake);
        const indexToRemove = currentRoomInventory.indexOf(itemToTake);
        currentRoomInventory.splice(indexToRemove, 1);
        setTimeout(game, 2000);
      } else {
        notSureText();
        setTimeout(game, 2000);
      }
    } else {
      notSureText();
      setTimeout(game, 2000);
    }

    // action to drop item
  } else if (splitAnswer.includes("drop")) {
    object = splitAnswer.find((word) => itemLookUp[word]);
    // You can't really 'drop' this item, so I added an exception.
    if (object?.shortName === "kung") {
      notSureText();
      setTimeout(game, 2000);
    } else if (itemLookUp[object]) {
      let itemToRemove = itemLookUp[object].inventoryName;
      let currentRoomInventory = locationLookUp[currentLocation].roomInventory;
      if (playerInventory.includes(itemToRemove)) {
        // when the player 'removes an object'
        // the object is 'pushed' into the room inventory
        // the item is removed from the player's inventory
        displayText(`\nYou decide to drop the${itemToRemove} into the room...`);
        currentRoomInventory.push(itemToRemove);
        let indexToRemove = playerInventory.indexOf(itemToRemove);
        playerInventory.splice(indexToRemove, 1);
        setTimeout(game, 2000);
      } else {
        notSureText();
        setTimeout(game, 2000);
      }
    } else {
      notSureText();
      setTimeout(game, 2000);
    }

    // action to move
  } else if (splitAnswer.includes("go")) {
    // since we're looking at each word in the answer
    //  this is an overly complicated way of making
    // sure a space between two directions
    // (example: north east) comes back as one word (northeast)...
    splitAnswer.forEach((word) => {
      if (validDirections.includes(word) && numberOfDirections === 0) {
        numberOfDirections += 1;
        object = word;
      } else if (validDirections.includes(word) && numberOfDirections === 1) {
        numberOfDirections += 1;
        object += word;
      }
    });

    // this is the locked door of the game to the north in the first room,
    // the player needs to use a key to change the doorLoop before it can open
    if (doorLoop === 0 && currentLocation === "room1" && object === "north") {
      displayText("\nThis door won't open... there's a golden lock on it...");
      setTimeout(game, 2000);
    } else if (validDirections.includes(object)) {
      // depending on the direction written in the answer
      // the x, y coordinates change and by doing
      // so directs to a new current room
      // for when the function is called again
      if (locationStates[currentLocation].includes(object)) {
        if (answer.includes("east")) {
          x += 1;
        }
        if (answer.includes("west")) {
          x -= 1;
        }
        if (answer.includes("south")) {
          y -= 1;
        }
        if (answer.includes("north")) {
          y += 1;
        }
        displayText(`\nYou're going through the door heading ${object}.`);
        setTimeout(game, 2000);
        // if the player input a valid direction but the
        // direction is not in the location states
        // the player can't move
      } else {
        displayText("\nYou can't go in that direction...");
        setTimeout(game, 2000);
      }
    } else {
      notSureText();
      setTimeout(game, 2000);
    }
  } else {
    notSureText();
    setTimeout(game, 2000);
  }
}

// Intro to the game with a main menu
// With ASCII art text
async function mainMenu() {
  console.clear();
  console.log(
    "\r\n              __  __      \r\n" +
      "             / /_/ /  ___ \r\n" +
      "            / __/ _ \\/ -_)\r\n" +
      "            \\__/_//_/\\__/  "
  );
  console.log(
    "    ____  ___ __         __                  \r\n" +
      "    \\   \\/  /|__|_______/  |______    _____  \r\n" +
      "     \\     / |  \\_  __ \\   __\\__  \\  /     \\ \r\n" +
      "     /     \\ |  ||  | \\/|  |  / __ \\|  Y Y  \\\r\n" +
      "    /___/\\  \\|__||__|   |__| (____  /__|_|  /\r\n" +
      "          \\_/                     \\/      \\/ \r\n"
  );

  const menuInput = await ask(
    "\nWelcome to the Xirtam!\n\n" +
      "- Type in 1 to play\n" +
      "- Type in 2 for instructions " +
      "(recommended before first playthrough)\n\n" +
      "Input: > "
  );
  if (menuInput.trim() !== "1" && menuInput.trim() !== "2") {
    displayText("\nInput 1 or 2");
    setTimeout(mainMenu, 1500);
  } else if (menuInput.trim() === "1") {
    start();
  } else if (menuInput.trim() === "2") {
    tutorial();
  }
}

// Tutorial to how the game functions
async function tutorial() {
  console.clear();
  displayText(
    "Thank you for trying my game. Here's a quick guide on how to play:\n\n" +
      "There are 5 main actions you can write down in each room: " +
      "'go', 'inspect', 'take', 'drop' and 'use'.\n\n" +
      "'go' - lets you move to another room - north, east, south, west.\n" +
      "Example: 'go east' or 'go door south-west'\n\n" +
      "'inspect' - lets you take a closer look at objects, " +
      "like furniture for instance, around the room.\n" +
      "Example: 'inspect mirror' or 'inspect the small table'\n\n" +
      "'take' - lets you pick up items from the room's " +
      "inventory and place it in your own inventory. " +
      "You can also 'drop' them back in the room\n" +
      "Example: 'take key' or 'drop letter'\n\n" +
      "'use' - if (and only if!) an item is in your " +
      "inventory, you can then 'use' it.\n" +
      "Example: 'use key'\n\n" +
      "I hope you enjoy your playthrough!\n\n" +
      "> Press enter to return to the main menu..."
  );
  await keypress();
  mainMenu();
}

// little 'cutscene' thanks to the help of setTimeouts
async function introSequence() {
  console.clear();
  setTimeout(() => {
    displayText(`Wake up, ${playerName}...`);
  }, 2500);
  setTimeout(() => {
    console.clear();
  }, 6000);
  setTimeout(() => {
    displayText("The Xirtam has you...");
  }, 8000);
  setTimeout(() => {
    console.clear();
  }, 12000);
  setTimeout(() => {
    displayText("Follow the black and white rabbit.");
  }, 15000);
  setTimeout(() => {
    console.clear();
  }, 19500);
  setTimeout(() => {
    displayText(`Knock, knock, ${playerName}.`);
  }, 21500);
  setTimeout(() => {
    console.clear();
  }, 24500);
  setTimeout(() => {
    displayText("\n\n     *KNOCK* *KNOCK*");
  }, 26500);
  setTimeout(() => {
    console.clear();
  }, 30000);
  setTimeout(game, 32000);
}

// ask for the player's name and uses it across the game
async function start() {
  console.clear();
  playerName = await ask("What is your name?\n> ");
  playerName = playerName.trim();
  let confirm = await ask(`\nYour name is ${playerName}? Y or N\n\
> `);
  confirm = sanitizeInput(confirm);
  while (confirm !== "y" && confirm !== "n") {
    confirm = await ask("Answer with Y or N \n> ");
  }
  if (confirm === "y") {
    console.clear();
    displayText(`\n Ok, your name is ${playerName}\n\n\
Press enter when you're ready to start the game!`);
    await keypress();
    game();
  } else {
    start();
  }
}

// this is it!

mainMenu();
// the mainMenu of the game is called
// to get the game started when the script is read
