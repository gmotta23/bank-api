const express = require("express");
const { globalRouter } = require("./routes/global");

const app = express();

const port = 8000;

app.use("/", globalRouter);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
