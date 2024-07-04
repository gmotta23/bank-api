const { database } = require("./");

function createUser(userData) {
  const { id, balance } = userData;

  if (getUser(id)) {
    throw new Error("User already exists");
  }

  database.users[id] = { id, balance };
}

function getUser(id) {
  return database.users[id];
}

function setBalance(id, balance) {
  const user = getUser(id);

  if (user === undefined) {
    throw new Error("User not found");
  }

  user.balance = balance;
}

module.exports = { createUser, getUser, setBalance };
