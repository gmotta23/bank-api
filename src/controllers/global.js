const { GlobalService } = require("../services/global");

const resetDatabase = (_req, res) => {
  new GlobalService().resetDatabase();
  res.send("ok");
};

module.exports = { resetDatabase };
