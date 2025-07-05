import express from "express";
import { isAuth } from "../controllers/authMiddleware.js";
import {
  createMessage,
  createUser,
  deleteMessage,
  getLogin,
  getMessages,
  getNewMessage,
  getSignUp,
  updateRole,
} from "../controllers/indexController.js";
import {
  loginAuthenticate,
  logOut,
} from "../controllers/passportController.js";

const indexRouter = express.Router();

indexRouter.get("/", getMessages);
indexRouter.get("/sign-up", getSignUp);
indexRouter.get("/log-in", getLogin);
indexRouter.get("/log-out", logOut);
indexRouter.get("/deleteMessage/:messageId", deleteMessage);
indexRouter.get("/newMessage", getNewMessage);
indexRouter.post("/key", updateRole);
indexRouter.post("/newMessage", createMessage);
indexRouter.post("/sign-up", createUser);
indexRouter.post("/log-in", loginAuthenticate);

export default indexRouter;
