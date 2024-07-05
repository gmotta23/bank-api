const { BalanceService } = require("../services/balance");

const getUserBalance = (req, res) => {
  const { account_id } = req.query;
  try {
    const balance = new BalanceService().getUserBalance(account_id);
    res.send(balance.toString());
  } catch (error) {
    res.status(404).send("0");
  }
};

module.exports = { getUserBalance };
