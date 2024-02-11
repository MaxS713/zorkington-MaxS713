const Item = require("../Classes/Item");

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

module.exports = itemLookUp;
