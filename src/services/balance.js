const { getUser } = require("../database/user");

class BalanceService {
  getUserBalance(userId) {
    const user = getUser(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user.balance;
  }
}

module.exports = { BalanceService };
