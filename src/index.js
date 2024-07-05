const express = require("express");
const { globalRouter } = require("./routes/global");
const { balanceRouter } = require("./routes/balance");
const { eventRouter } = require("./routes/event");

const app = express();
app.use(express.json());

const port = 8000;

app.use("/", globalRouter);
app.use("/balance", balanceRouter);
app.use("/event", eventRouter);

if (process.env.ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}

module.exports = { app };
