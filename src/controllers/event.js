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

const withdraw = (req, res) => {
  const { origin, amount } = req.body;
  const withdrawPayload = {
    id: origin,
    amount,
  };

  try {
    new EventService().withdraw(withdrawPayload);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }

  const user = getUser(origin);

  res.status(201).send({ origin: { ...user } });
};

const transfer = (req, res) => {
  const { origin, destination, amount } = req.body;

  const transferPayload = {
    origin,
    destination,
    amount,
  };

  try {
    new EventService().transfer(transferPayload);
  } catch {
    return res.status(404).send({ error: error.message });
  }

  const userOrigin = getUser(origin);
  const userDestination = getUser(destination);

  res
    .status(201)
    .send({ origin: { ...userOrigin }, destination: { ...userDestination } });
};

const eventMap = Object.freeze({
  deposit,
  withdraw,
  transfer,
});

const handleEvent = (req, res) => {
  const { type } = req.body;

  const eventHandler = eventMap[type];

  if (!eventHandler) {
    return res.status(400).send("Invalid event type");
  }

  eventHandler(req, res);
};

module.exports = { handleEvent };
