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
  withdraw(withdrawPayload) {
    const { id, amount } = withdrawPayload;

    const user = getUser(id);

    if (!user) {
      throw new Error("User not found");
    }

    user.balance -= amount;
  }
  transfer() {}
}

module.exports = { EventService };
