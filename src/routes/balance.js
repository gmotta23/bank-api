const { Router } = require("express");
const { getUserBalance } = require("../controllers/balance");

const balanceRouter = Router();

balanceRouter.get("/", getUserBalance);

module.exports = { balanceRouter };
