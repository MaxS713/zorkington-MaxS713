const {
  displayText,
  pressEnterText,
  keypress,
  ask,
  notSureText,
  sanitizeInput,
  sleep,
} = require("./Utils/utils");

const { playerData, storyTracker, gameData } = require("./Utils/vars");

const itemLookUp = require("./Constructors/items");
const locationLookUp = require("./Constructors/locations");
const objectLookUp = require("./Constructors/roomObjects");

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

// where you can or cannot go from one room to another
const locationStates = {
  room1: ["east", "south", "north"],
  room2: ["west", "east", "south"],
  room3: ["west", "southwest"],
  room4: ["northeast", "north", "west"],
  room5: ["east", "north"],
  room6: ["south"],
};

// actual start of the game
async function game() {
  // I created a system of coordinates x and y
  // when you move east x+= 1, and when you move north y+= 1, etc...
  // x and y define which current room you're in
  if (x === 2 && y === 2) {
    gameData.currentLocation = "room1";
  } else if (x === 3 && y === 2) {
    gameData.currentLocation = "room2";
  } else if (x === 4 && y === 2) {
    gameData.currentLocation = "room3";
  } else if (x === 3 && y === 1) {
    gameData.currentLocation = "room4";
  } else if (x === 2 && y === 1) {
    gameData.currentLocation = "room5";
  } else if (x === 2 && y === 3) {
    gameData.currentLocation = "room6";
  }

  // some intros to each room that only play once on
  // the first time you enter them (when the firstEncounter value is 'false')
  console.clear();

  // intro to the 1st room
  if (
    gameData.currentLocation === "room1" &&
    locationLookUp[gameData.currentLocation].firstEncounter === true
  ) {
    locationLookUp[gameData.currentLocation].firstEncounter = false;
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
    gameData.currentLocation === "room2" &&
    locationLookUp[gameData.currentLocation].firstEncounter === true &&
    !storyTracker.room2Visited
  ) {
    locationLookUp[gameData.currentLocation].firstEncounter = false;
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
    gameData.currentLocation === "room2" &&
    locationLookUp[gameData.currentLocation].firstEncounter === true &&
    storyTracker.room2Visited
  ) {
    locationLookUp[gameData.currentLocation].firstEncounter = false;
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
    gameData.currentLocation === "room3" &&
    locationLookUp[gameData.currentLocation].firstEncounter === true
  ) {
    locationLookUp[gameData.currentLocation].firstEncounter = false;
    storyTracker.room2Visited = true;
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
    gameData.currentLocation === "room4" &&
    locationLookUp[gameData.currentLocation].firstEncounter === true
  ) {
    locationLookUp[gameData.currentLocation].firstEncounter = false;
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
    gameData.currentLocation === "room5" &&
    locationLookUp[gameData.currentLocation].firstEncounter === true
  ) {
    locationLookUp[gameData.currentLocation].firstEncounter = false;
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
    gameData.currentLocation === "room6" &&
    locationLookUp[gameData.currentLocation].firstEncounter === true
  ) {
    locationLookUp[gameData.currentLocation].firstEncounter = false;
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
  displayText(`You are in the ${
    locationLookUp[gameData.currentLocation].name
  }, \
${locationLookUp[gameData.currentLocation].description}\n`);

  // displays the current location's objects
  displayText(`Objects around you that you can [inspect]:\
${locationLookUp[gameData.currentLocation].objectsInRoom}.\n`);

  // if any, a.k.a .roomInventory.length !==0,
  // shows any items present in the room
  if (locationLookUp[gameData.currentLocation].roomInventory.length !== 0) {
    displayText(`Items in the room that you can [take]:\
${locationLookUp[gameData.currentLocation].roomInventory}\n`);
  }

  // display doors the player can take
  displayText(
    "Doors you can [go] through:" +
      `${locationLookUp[gameData.currentLocation].doorsInRoom}\n`
  );

  // if any, a.k.a .playerData.playerInventory.length !==0,
  // shows any items present in the player's inventory
  if (playerData.playerInventory.length !== 0) {
    displayText(
      "Objects in your inventory that you can [use]:" +
        `${playerData.playerInventory}\n`
    );
  }

  // here the player can input his actions...
  const answer = await ask("What would you like to do?\n\n> ");

  // the answer is 'sanitized'
  // the answer is also 'split' at every space
  const sanitizedAnswer = sanitizeInput(answer);
  const splitAnswer = sanitizedAnswer.split(" ");

  let object = "";
  let numberOfDirections = 0;

  // the player can 'inspect', 'use', 'take', 'drop' and 'go'
  // first it checks if one of the action word is in the answer
  if (splitAnswer.includes("inspect")) {
    // if the target needed is in the answer
    // it's assigned to a variable
    object = splitAnswer.find((word) => objectLookUp[word]);

    // checks if an object was in the answer
    if (objectLookUp[object]) {
      // checks if the object is in the current room
      if (
        locationLookUp[gameData.currentLocation].objectsInRoom
          .toString()
          .includes(objectLookUp[object].name)
      ) {
        console.clear();
        // if the conditions are met a method is called on the object
        await objectLookUp[object].describe();
        game();
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
      if (
        playerData.playerInventory.includes(itemLookUp[object].inventoryName)
      ) {
        await itemLookUp[object].use();
        game();
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
        locationLookUp[gameData.currentLocation].roomInventory;
      if (currentRoomInventory.includes(itemToTake)) {
        // when the player 'takes an object'
        // the object is 'pushed' into his inventory
        // the item is removed from the room's inventory
        displayText(`\nYou pick up the${itemToTake}`);
        playerData.playerInventory.push(itemToTake);
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
      const itemToRemove = itemLookUp[object].inventoryName;
      const currentRoomInventory =
        locationLookUp[gameData.currentLocation].roomInventory;
      if (playerData.playerInventory.includes(itemToRemove)) {
        // when the player 'removes an object'
        // the object is 'pushed' into the room inventory
        // the item is removed from the player's inventory
        displayText(`\nYou decide to drop the${itemToRemove} into the room...`);
        currentRoomInventory.push(itemToRemove);
        const indexToRemove = playerData.playerInventory.indexOf(itemToRemove);
        playerData.playerInventory.splice(indexToRemove, 1);
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
    if (
      !storyTracker.doorUnlocked &&
      gameData.currentLocation === "room1" &&
      object === "north"
    ) {
      displayText("\nThis door won't open... there's a golden lock on it...");
      setTimeout(game, 2000);
    } else if (validDirections.includes(object)) {
      // depending on the direction written in the answer
      // the x, y coordinates change and by doing
      // so directs to a new current room
      // for when the function is called again
      if (locationStates[gameData.currentLocation].includes(object)) {
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

async function introSequence() {
  console.clear();
  await sleep(2500);
  displayText(`Wake up, ${playerData.playerName}...`);
  await sleep(3500);
  console.clear();
  await sleep(2000);
  displayText("The Xirtam has you...");
  await sleep(4000);
  console.clear();
  await sleep(2000);
  displayText("Follow the black and white rabbit.");
  await sleep(3500);
  console.clear();
  await sleep(2000);
  displayText(`Knock, knock, ${playerData.playerName}.`);
  await sleep(3500);
  console.clear();
  await sleep(2000);
  displayText("\n\n     *KNOCK* *KNOCK*");
  await sleep(3500);
  console.clear();
  await sleep(2000);
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
}

// ask for the player's name and uses it across the game
async function start() {
  console.clear();
  playerData.playerName = await ask("What is your name?\n> ");
  playerData.playerName = playerData.playerName.trim();
  if (!playerData.playerName) start();
  let confirm = await ask(`\nYour name is ${playerData.playerName}? Y or N\n\
    > `);
  confirm = sanitizeInput(confirm);
  while (confirm !== "y" && confirm !== "n") {
    // eslint-disable-next-line no-await-in-loop
    confirm = await ask("Answer with Y or N \n> ");
    confirm = sanitizeInput(confirm);
  }
  if (confirm === "y") {
    console.clear();
    displayText(`\n Ok, your name is ${playerData.playerName}\n\n\
    Press enter when you're ready to start the game!`);
    await keypress();
    await introSequence();
    game();
  } else {
    start();
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
    await tutorial();
    mainMenu();
  }
}

mainMenu();
