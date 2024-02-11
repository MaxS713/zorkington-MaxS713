const Location = require("../Classes/Location");

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

module.exports = locationLookUp;
