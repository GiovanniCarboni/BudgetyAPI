const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
