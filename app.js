require('dotenv').config()
const express = require('express');
const cors = require("cors");
const authRouter = require("./src/auth/auth.route");
const postRouter = require("./src/post/post.route");
const userRouter = require("./src/user/user.route");
const app = express();

const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./src/config/swagger");

app.get("/", (req, res) => {
  return res.send("Hello world!");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());
app.use(cors());

app.use(postRouter);
app.use(authRouter);
app.use(userRouter);

module.exports = app;