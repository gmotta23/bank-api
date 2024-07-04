const { Router } = require("express");
const { resetDatabase } = require("../controllers/global");

const globalRouter = Router();

globalRouter.post("/reset", resetDatabase);

module.exports = { globalRouter };
