const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const request = require("supertest");

const { refreshDatabase } = require("../../src/database");
const { createUser } = require("../../src/database/user");
const { app } = require("../../src");

describe("/event deposit", () => {
  beforeEach(() => refreshDatabase());
  it("Should properly deposit for existing user", async () => {
    const userData = {
      id: 32,
      balance: 100,
    };
    createUser(userData);

    const payload = {
      type: "deposit",
      destination: 32,
      amount: 200,
    };

    const response = await request(app).post("/event").send(payload);

    assert.equal(response.status, 201);
    assert.deepEqual(response.body, { destination: { id: 32, balance: 300 } });
  });

  it("Should properly deposit for non existing user", async () => {
    const payload = {
      type: "deposit",
      destination: 32,
      amount: 200,
    };

    const response = await request(app).post("/event").send(payload);

    assert.equal(response.status, 201);
    assert.deepEqual(response.body, { destination: { id: 32, balance: 200 } });
  });
});

describe("/event withdraw", () => {
  beforeEach(() => refreshDatabase());
  it("Should properly withdraw for existing user", async () => {
    const userData = {
      id: 32,
      balance: 400,
    };
    createUser(userData);

    const payload = {
      type: "withdraw",
      origin: 32,
      amount: 50,
    };

    const response = await request(app).post("/event").send(payload);

    assert.equal(response.status, 201);
    assert.deepEqual(response.body, { origin: { id: 32, balance: 350 } });
  });

  it("Should fail to withdraw for non existing user", async () => {
    const payload = {
      type: "withdraw",
      origin: 32,
      amount: 50,
    };

    const response = await request(app).post("/event").send(payload);

    assert.equal(response.status, 404);
  });
});

describe("/event transfer", () => {
  beforeEach(() => refreshDatabase());
  it("Should properly transfer for existing origin", async () => {
    const userOrigin = {
      id: 101,
      balance: 500,
    };

    const userDestination = {
      id: 104,
      balance: 100,
    };

    createUser(userOrigin);
    createUser(userDestination);

    const payload = {
      type: "transfer",
      origin: 101,
      destination: 104,
      amount: 200,
    };

    const response = await request(app).post("/event").send(payload);

    assert.equal(response.status, 201);
    assert.deepEqual(response.body, {
      origin: { id: 101, balance: 300 },
      destination: { id: 104, balance: 300 },
    });
  });

  it("Should fail to refresh for non existing origin", async () => {
    const userOrigin = {
      id: 101,
      balance: 500,
    };

    const userDestination = {
      id: 104,
      balance: 100,
    };

    createUser(userDestination);

    const payload = {
      type: "transfer",
      origin: 101,
      destination: 104,
      amount: 200,
    };

    const response = await request(app).post("/event").send(payload);

    assert.equal(response.status, 404);
  });
});
