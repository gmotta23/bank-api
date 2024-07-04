const { describe, it } = require("node:test");
const assert = require("assert");
const request = require("supertest");

const { database } = require("../../src/database");
const { createUser } = require("../../src/database/user");
const { app } = require("../../src");

describe("/reset", () => {
  it("Should reset database", () => {
    const userData = {
      id: 32,
      balance: 100,
    };
    createUser(userData);

    assert.equal(Object.keys(database.users).length, 1);

    request(app)
      .post("/reset")
      .expect(200)
      .end((_err, res) => {
        assert.equal(res.text, "ok");
        assert.equal(Object.keys(database.users).length, 0);
      });
  });
});
