const RoomObject = require("../Classes/RoomObject");

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

module.exports = objectLookUp;
