const { describe, it } = require("node:test");
const assert = require("assert");
const { database, refreshDatabase } = require("../../src/database");
const { createUser } = require("../../src/database/user");

describe("refresh", () => {
  it("Should refresh database properly", () => {
    const userData = {
      balance: 50,
      id: 4,
    };
    createUser(userData);

    assert.deepEqual(database, { users: { 4: { balance: 50, id: 4 } } });

    refreshDatabase();

    assert.deepEqual(database, { users: {} });
  });
});
