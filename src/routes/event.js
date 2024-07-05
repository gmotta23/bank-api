const { Router } = require("express");
const { handleEvent } = require("../controllers/event");

const eventRouter = Router();

eventRouter.post("/", handleEvent);

module.exports = { eventRouter };
