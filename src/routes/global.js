const { Router } = require("express");
const { GlobalService } = require("../services/global");

const globalRouter = Router();

globalRouter.post("/reset", (_req, res) => {
  new GlobalService().resetDatabase();
  res.send("ok");
});

module.exports = { globalRouter };
