const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const { database, refreshDatabase } = require("../../src/database");
const { createUser, getUser, setBalance } = require("../../src/database/user");

describe("users", () => {
  beforeEach(() => refreshDatabase());
  it("Should create an user", () => {
    assert.deepEqual(database, { users: {} });

    const userData = {
      id: 4,
      balance: 50,
    };
    createUser(userData);

    assert.deepEqual(database, { users: { 4: { balance: 50, id: 4 } } });
  });

  it("Should fail to create the same user twice", () => {
    assert.deepEqual(database, { users: {} });

    const userData = {
      id: 4,
      balance: 50,
    };
    createUser(userData);

    assert.throws(() => {
      createUser(userData);
    });

    assert.deepEqual(database, { users: { 4: { balance: 50, id: 4 } } });
  });

  it("Should get user properly", () => {
    const userData = {
      id: 4,
      balance: 50,
    };

    assert.deepEqual(getUser(userData.id), undefined);

    createUser(userData);

    assert.deepEqual(getUser(userData.id), userData);
  });

  it("Should set balance properly for multiple users atomically", () => {
    const user1 = {
      id: 123,
      balance: 54,
    };

    const user2 = {
      id: 243,
      balance: 34,
    };

    createUser(user1);
    createUser(user2);

    setBalance(123, 11);
    setBalance(243, 22);

    assert.deepEqual(getUser(user1.id), { balance: 11, id: 123 });
    assert.deepEqual(getUser(user2.id), { balance: 22, id: 243 });
  });
});
