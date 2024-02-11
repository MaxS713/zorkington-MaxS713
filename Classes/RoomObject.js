const {
  displayText,
  keypress,
  pressEnterText,
  ask,
  sanitizeInput,
} = require("../Utils/utils");

const { storyTracker, playerData, gameData } = require("../Utils/vars");

const locationLookUp = require("../Constructors/locations");

// Class for the objects(furniture) in each room
module.exports = class RoomObject {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  async describe() {
    // The method prints the description of the object
    displayText(`${this.description}`);

    // the function changes for objects that have special outcome
    if (this.name === "table" && !storyTracker.tableInteractedWith) {
      storyTracker.tableInteractedWith = true;
      displayText(
        "\nYou take a closer look at the end table and " +
          "you decide to open the drawer. \n" +
          "Inside you see a remote control."
      );
      // for instance looking at the table adds the remote control to the room
      locationLookUp[gameData.currentLocation].roomInventory.push(
        " Remote Control"
      );
      pressEnterText();
      await keypress();
      return;
      // special text outcome for the rabbit hole
      // (before the carrot given to the rabbit event happened)
    }
    if (this.name === "hole" && !storyTracker.carrotUsed) {
      displayText(
        "\nYou can see something shining inside, " +
          "but you can't reach it because the rabbit is " +
          "in the way and rabbits are stubborn."
      );
      pressEnterText();
      await keypress();
      return;
      // special text outcome for the kung-fu master
      // if you haven't interacted with him yet
    }
    if (this.name === "master" && !storyTracker.masterInteractedWith) {
      displayText(
        "\nAs you get closer, the martial artist quickly pushes you away, " +
          "and with a secret technique, slams you to the ground..."
      );
      pressEnterText();
      await keypress();
      return;
      // special outcome that checks the code for the safe,
      // if it hasn't been opened yet
    }
    if (this.name === "safe" && !storyTracker.safeCodeInputted) {
      const codeInput = await ask("\nWhat code do you input? > ");
      if (sanitizeInput(codeInput) === "3587") {
        storyTracker.safeCodeInputted = true;
        locationLookUp[gameData.currentLocation].roomInventory.push(
          " Floppy Disk"
        );
        displayText("\nThe safe opens!");
        displayText("You see a Floppy Disk Inside...");
        pressEnterText();
        await keypress();
        return;
      }
      displayText("\nThat didn't seem to work...");
      pressEnterText();
      await keypress();
      return;
      // final outcome for interacting with the agent
    }
    if (this.name === "agent") {
      displayText(
        `\n'Hello ${playerData.playerName}!!\n\n` +
          "  So good of you to join us...\n\n" +
          "  Welcome to the desert of the REAL!'\n\n\n" +
          "  TO BE CONTINUED...\n\n" +
          "  Thanks for playing!\n\n" +
          "  > Press any key to exit."
      );
      await keypress();
      console.clear();
      process.exit();
    }
    pressEnterText();
    await keypress();
  }
};
