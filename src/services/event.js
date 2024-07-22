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

    setBalance(id, user.balance - amount);
  }
  transfer(transferPayload) {
    const { origin, destination, amount } = transferPayload;

    const originUser = getUser(origin);
    let destinationUser = getUser(destination);

    if (!originUser) {
      throw new Error("Origin user not found");
    }

    if (!destinationUser) {
      destinationUser = {
        id: destination,
        balance: amount,
      };
      createUser(destinationUser);
    }

    setBalance(originUser.id, originUser.balance - amount);
    setBalance(destinationUser.id, destinationUser.balance + amount);
  }
}

module.exports = { EventService };
