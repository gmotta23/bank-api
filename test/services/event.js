const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");

const { EventService } = require("../../src/services/event");
const { refreshDatabase } = require("../../src/database");
const { createUser, getUser } = require("../../src/database/user");

describe("deposit", () => {
  beforeEach(() => refreshDatabase());

  it("Should deposit properly if account exists", () => {
    const userData = {
      id: 10,
      balance: 20,
    };
    createUser(userData);

    const depositPayload = {
      id: 10,
      amount: 40,
    };

    assert.deepEqual(getUser(userData.id), { id: 10, balance: 20 });

    new EventService().deposit(depositPayload);

    assert.deepEqual(getUser(userData.id), { id: 10, balance: 60 });
  });

  it("Should create an account if account not existent", () => {
    const depositPayload = {
      id: 11,
      amount: 40,
    };

    assert.deepEqual(getUser(depositPayload.id), undefined);

    new EventService().deposit(depositPayload);

    assert.deepEqual(getUser(depositPayload.id), { id: 11, balance: 40 });
  });
});
