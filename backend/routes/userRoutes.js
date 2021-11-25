const express = require("express");
const { registerUser, authUser } = require("../controller/userControllers");

const userRouter = express.Router();

userRouter.route("/").post(registerUser);
userRouter.route("/login").post(authUser);

module.exports = userRouter;