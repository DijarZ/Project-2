const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const usersRouter = require("./routers/users");
const tasksRouter = require("./routers/tasks");
const statusRouter = require("./routers/status");

const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/", usersRouter);
app.use("/", tasksRouter);
app.use("/", statusRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
