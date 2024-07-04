const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");

const { BalanceService } = require("../../src/services/balance");
const { refreshDatabase } = require("../../src/database");
const { createUser } = require("../../src/database/user");

describe("get", () => {
  beforeEach(() => refreshDatabase());

  it("Should get balance of existing user", () => {
    const userData = {
      id: 32,
      balance: 100,
    };
    createUser(userData);

    const result = new BalanceService().getUserBalance(userData.id);

    assert.equal(result, userData.balance);
  });
  it("Should fail to get balance of non existing user", () => {
    const userData = {
      id: 32,
      balance: 100,
    };

    assert.throws(() => {
      const result = new BalanceService().getUserBalance(userData.id);
    });
  });
});
