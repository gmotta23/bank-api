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

describe("withdraw", () => {
  beforeEach(() => refreshDatabase());

  it("Should withdraw properly if account exists", () => {
    const userData = {
      id: 12,
      balance: 35,
    };
    createUser(userData);

    const withdrawPayload = {
      id: 12,
      amount: 20,
    };

    assert.deepEqual(getUser(userData.id), { id: 12, balance: 35 });

    new EventService().withdraw(withdrawPayload);

    assert.deepEqual(getUser(userData.id), { id: 12, balance: 15 });
  });
  it("Should fail to withdraw if account not existent", () => {
    const withdrawPayload = {
      id: 12,
      amount: 20,
    };

    assert.deepEqual(getUser(withdrawPayload.id), undefined);

    assert.throws(() => {
      new EventService().withdraw(withdrawPayload);
    });

    assert.deepEqual(getUser(withdrawPayload.id), undefined);
  });
});

describe("transfer", () => {
  beforeEach(() => refreshDatabase());

  it("Should transfer properly from an existing account", () => {
    const userDataOrigin = {
      id: 45,
      balance: 400,
    };

    const userDataDestination = {
      id: 49,
      balance: 30,
    };

    createUser(userDataOrigin);
    createUser(userDataDestination);

    assert.deepEqual(getUser(userDataOrigin.id), { id: 45, balance: 400 });
    assert.deepEqual(getUser(userDataDestination.id), { id: 49, balance: 30 });

    const transferPayload = {
      origin: 45,
      destination: 49,
      amount: 100,
    };

    new EventService().transfer(transferPayload);

    assert.deepEqual(getUser(userDataOrigin.id), { id: 45, balance: 300 });
    assert.deepEqual(getUser(userDataDestination.id), { id: 49, balance: 130 });
  });
  it("Should fail to transfer from non existent account", () => {
    const nonExistingUserOrigin = {
      id: 45,
      balance: 400,
    };

    const userDataDestination = {
      id: 51,
      balance: 34,
    };

    createUser(userDataDestination);

    assert.deepEqual(getUser(nonExistingUserOrigin), undefined);
    assert.deepEqual(getUser(userDataDestination.id), { id: 51, balance: 34 });

    const transferPayload = {
      origin: 45,
      destination: 51,
      amount: 200,
    };

    assert.throws(() => {
      new EventService().transfer(transferPayload);
    });

    assert.deepEqual(getUser(nonExistingUserOrigin), undefined);
    assert.deepEqual(getUser(userDataDestination.id), { id: 51, balance: 34 });
  });
});
