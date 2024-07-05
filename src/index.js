const express = require("express");
const { globalRouter } = require("./routes/global");
const { balanceRouter } = require("./routes/balance");

const app = express();

const port = 8000;

app.use("/", globalRouter);
app.use("/balance", balanceRouter);

if (process.env.ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}

module.exports = { app };
