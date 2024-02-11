const {
  displayText,
  pressEnterText,
  keypress,
  ask,
  sanitizeInput,
  sleep,
} = require("../Utils/utils");

const { playerData, gameData, storyTracker } = require("../Utils/vars");

const locationLookUp = require("../Constructors/locations");

module.exports = class Item {
  constructor(shortName, inventoryName) {
    this.shortName = shortName;
    this.inventoryName = inventoryName;
  }

  async use() {
    // what every item do when the method use is applied to them
    if (this.shortName === "package") {
      // remove the item from the player's inventory when used
      // by looking up its index in the inventory and then 'splicing' it
      const indexToRemove = playerData.playerInventory.indexOf(
        this.inventoryName
      );
      playerData.playerInventory.splice(indexToRemove, 1);
      console.clear();

      // long text for reading the letter inside the brown package
      displayText(
        "You open the brown package, inside you " +
          "see an envelope that says:\n\n" +
          "'Welcome to the Xirtam.'\n\n" +
          "There's a small box, you open it and find " +
          "two pills, a red pill and a blue pill.\n" +
          "You open the envelope and start reading the letter inside..."
      );
      pressEnterText();
      await keypress();
      console.clear();
      displayText(
        `Hello ${playerData.playerName},\n\n` +
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
        // eslint-disable-next-line no-await-in-loop
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
        process.exit();
      }
      if (answer === "red") {
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
        playerData.playerInventory.push(" Blue Pill");
        playerData.playerInventory.push(" Letter");
        pressEnterText();
        await keypress();
        return;
      }
      // using the letter goes through the text again
      // I should've stored all the text in a variable, but a copy paste works,
      // although redundant
    } else if (this.shortName === "letter") {
      console.clear();
      displayText(
        "You go through the letter again...\n\n" +
          `Hello ${playerData.playerName},\n\n` +
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
      return;
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
      process.exit();
    }
    // using the remote control
    if (this.shortName === "remote") {
      // if the item isn't used in its proper room
      // the game doesn't allow it
      if (gameData.currentLocation !== "room2") {
        displayText("\nYou can't use that here...");
        await sleep(2000);
        return;
      }
      console.clear();
      // text that appears when using the remote control
      displayText(
        "You push the power button of the remote and the TV turns on " +
          "and a tape starts playing.\n\n" +
          "A person dressed in leather and wearing sunglasses " +
          "appears and start talking...\n"
      );
      pressEnterText();
      await keypress();
      console.clear();
      displayText(
        `Hello ${playerData.playerName}, I've been expecting you.\n\n` +
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
          "You've been living in a dream world, " +
          `${playerData.playerName}.\n\n` +
          "Come join us and learn the truth. \n\n" +
          "To do this, all you need to know to know " +
          "right now is A = 5, it will make sense soon…"
      );
      pressEnterText();
      await keypress();
      return;
    }
    //  text that appears when using the floppy disk
    if (this.shortName === "disk") {
      if (gameData.currentLocation !== "room4") {
        displayText("\nYou can't use that here...");
        await sleep(2000);
        return;
      }
      const indexToRemove = playerData.playerInventory.indexOf(
        this.inventoryName
      );
      playerData.playerInventory.splice(indexToRemove, 1);
      console.clear();
      displayText(
        "You insert the disk into the computer...\n\n" +
          "A folder called 'kung-fu' appears, " +
          "you open it, a whole bunch of videos " +
          "about kung fu start playing...\n\n" +
          "You sit there for about 2 hours.\n\n" +
          "At the end, you tell to yourself: 'I know Kung Fu.'"
      );
      playerData.playerInventory.push(" Kung-Fu Skills");
      pressEnterText();
      await keypress();
      return;
      //  text that appears when using kung fu
    }
    if (this.shortName === "kung") {
      if (gameData.currentLocation !== "room5") {
        displayText("\nYou can't use that here...");
        await sleep(2000);
        return;
      }
      storyTracker.masterInteractedWith = true;
      const indexToRemove = playerData.playerInventory.indexOf(
        this.inventoryName
      );
      playerData.playerInventory.splice(indexToRemove, 1);
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
      playerData.playerInventory.push(" Carrot");
      pressEnterText();
      await keypress();
      return;
      //  text that appears when using the carrot
    }
    if (this.shortName === "carrot") {
      if (gameData.currentLocation !== "room3") {
        displayText("\nYou can't use that here...");
        await sleep(2000);
        return;
      }

      storyTracker.carrotUsed = true;
      const indexToRemove = playerData.playerInventory.indexOf(
        this.inventoryName
      );
      playerData.playerInventory.splice(indexToRemove, 1);
      console.clear();
      displayText(
        "You hand the carrot to the black and white rabbit...\n\n" +
          "The rabbit inspects it carefully. " +
          "Then suddenly its eyes go wide! " +
          "It raises its ears, bites into the carrot, " +
          "takes it, and runs away!\n\n" +
          "You can now see the item that was in its hole: it's a golden key."
      );
      locationLookUp[gameData.currentLocation].roomInventory.push(
        " Golden Key"
      );
      pressEnterText();
      await keypress();
      return;
      //  text that appears when using the key
      // also this unlocks the door if used in the proper room
    }
    if (this.shortName === "key") {
      if (gameData.currentLocation !== "room1") {
        displayText("\nYou can't use that here...");
        await sleep(2000);
        return;
      }
      const indexToRemove = playerData.playerInventory.indexOf(
        this.inventoryName
      );
      playerData.playerInventory.splice(indexToRemove, 1);
      storyTracker.doorUnlocked = true;
      displayText(
        "\nYou use the golden key on the door heading north...\n" +
          "It unlocks..."
      );
      pressEnterText();
      await keypress();
      return;
    }
    pressEnterText();
    await keypress();
  }
};
