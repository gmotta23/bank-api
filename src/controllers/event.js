const { getUser } = require("../database/user");
const { EventService } = require("../services/event");

const deposit = (req, res) => {
  const { destination, amount } = req.body;
  const depositPayload = {
    id: destination,
    amount,
  };

  new EventService().deposit(depositPayload);

  const user = getUser(destination);

  res.status(201).send({ destination: { ...user } });
};

const withdraw = (req, res) => {};

const transfer = (req, res) => {};

const eventMap = Object.freeze({
  deposit,
  withdraw,
  transfer,
});

const handleEvent = (req, res) => {
  const { type } = req.body;

  const eventHandler = eventMap[type];

  if (!eventHandler) {
    res.status(400).send("Invalid event type");
  }

  eventHandler(req, res);
};

module.exports = { handleEvent };
