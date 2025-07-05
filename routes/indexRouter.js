import express from "express";
import { isAuth } from "../controllers/authMiddleware.js";
import {
  createMessage,
  createUser,
  getLogin,
  getMessages,
  getNewMessage,
  getSignUp,
} from "../controllers/indexController.js";
import {
  loginAuthenticate,
  logOut,
} from "../controllers/passportController.js";

const indexRouter = express.Router();

indexRouter.get("/", isAuth, getMessages);
indexRouter.get("/sign-up", getSignUp);
indexRouter.get("/log-in", getLogin);
indexRouter.get("/log-out", logOut);
indexRouter.get("/newMessage", getNewMessage);
indexRouter.post("/newMessage", createMessage);
indexRouter.post("/sign-up", createUser);
indexRouter.post("/log-in", loginAuthenticate);

export default indexRouter;
