const express = require("express");
require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;
const db_password = process.env.DB_PASSWORD;
const mongo_uri = `mongodb+srv://kunduudit8158059368:${db_password}@cluster0.b6tg2qh.mongodb.net/coursetuna?retryWrites=true&w=majority&appName=Cluster0`;

// connect to db
mongoose
  .connect(mongo_uri)
  .then(() => console.log("CONNECTED TO DB"))
  .catch((err) => console.log("----CONNECTION TO DB FAILED ----", err));

// Global middlwares
app.use(express.json());
// Routes
app.use("/admin", adminRouter);
app.use("/", userRouter);

// Start the server
app.listen(port, () => {
  console.log("server is running");
  console.log(process.env.PORT);
});
