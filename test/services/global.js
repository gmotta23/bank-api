const { describe, it } = require("node:test");
const assert = require("assert");

const { GlobalService } = require("../../src/services/global");
const { database } = require("../../src/database");
const { createUser, getUser } = require("../../src/database/user");

describe("reset", () => {
  it("Should reset database", () => {
    const userData = {
      id: 32,
      balance: 100,
    };
    createUser(userData);

    assert.equal(Object.keys(database.users).length, 1);

    new GlobalService().resetDatabase();

    assert.equal(Object.keys(database.users).length, 0);
  });
});
