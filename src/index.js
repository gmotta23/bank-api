const express = require("express");
const { globalRouter } = require("./routes/global");

const app = express();

const port = 8000;

app.use("/", globalRouter);

if (process.env.ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}

module.exports = { app };
