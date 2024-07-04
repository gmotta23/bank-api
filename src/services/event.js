const { setBalance, getUser, createUser } = require("../database/user");

class EventService {
  deposit(depositPayload) {
    const { id, amount } = depositPayload;

    const user = getUser(id);

    if (user) {
      const balanceWithDeposit = user.balance + amount;
      setBalance(id, balanceWithDeposit);
    } else {
      createUser({
        id,
        balance: amount,
      });
    }
  }
  withdraw() {}
  transfer() {}
}

module.exports = { EventService };
