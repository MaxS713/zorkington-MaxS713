const storyTracker = {
  doorUnlocked: false,
  carrotUsed: false,
  masterInteractedWith: false,
  tableInteractedWith: 0,
  safeCodeInputted: 0,
  room2Visited: false,
};

const playerData = {
  playerInventory: [],
  playerName: "",
};

const gameData = {
  currentLocation: "",
};

module.exports = {
  storyTracker,
  playerData,
  gameData,
};
