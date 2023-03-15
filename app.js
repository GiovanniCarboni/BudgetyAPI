const path = require("path");

const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", expenseRouter);

module.exports = app;
