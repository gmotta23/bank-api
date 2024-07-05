const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const request = require("supertest");

const { database, refreshDatabase } = require("../../src/database");
const { createUser } = require("../../src/database/user");
const { app } = require("../../src");

describe("/balance", () => {
  beforeEach(() => refreshDatabase());
  it("Should get balance for existing account", async () => {
    const userData = {
      id: 32,
      balance: 100,
    };
    createUser(userData);

    const response = await request(app).get(
      `/balance?account_id=${userData.id}`
    );

    assert.equal(response.status, 200);
    assert.equal(response.text, 100);
  });

  it("Should fail to get balance for non existing account", async () => {
    const userData = {
      id: 32,
      balance: 100,
    };

    const response = await request(app).get(
      `/balance?account_id=${userData.id}`
    );

    assert.equal(response.status, 404);
  });
});
