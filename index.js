const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRouter = require("./routes/user.js");
const postRouter = require("./routes/post.js");

dotenv.config();

const { MONGODB_DATA } = process.env;

mongoose
  .connect(MONGODB_DATA)
  .then(() => console.log("DB ok"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/auth", userRouter);
app.use("/post", postRouter);

app.listen(4444, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Server work!");
});
