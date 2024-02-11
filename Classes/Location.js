module.exports = class Location {
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
};
