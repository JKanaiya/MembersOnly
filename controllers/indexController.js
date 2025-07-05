import {
  addMessage,
  getAllMessages,
  dbMsgDelete,
  addUser,
  setRole,
} from "../db/queries.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

const validateUser = [
  body("fullname")
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage(`Full name must be at min 1 and max length of 15 chars`),
  body("email")
    .trim()
    .isEmail()
    .withMessage(`Email must be formatted properly`),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage(`Password has a min length of 4 chars`),
  body("passwordConfirm")
    .trim()
    .custom((val, { req }) => {
      console.log(val === req.body.password);
      return val === req.body.password;
      // if (val !== req.body.password) {
      //   throw new Error("Passwords do not match.");
      // }
    })
    .withMessage("Passwords do not match"),
  body("role").trim().optional(),
];

const validateMessage = [
  body("message")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Text must be within 2 and 30 characters"),
];

const getMessages = async function (req, res) {
  const messages = await getAllMessages();
  res.render("index", {
    messages: messages,
  });
};

const updateRole = async function (req, res) {
  console.log(req.body.key);
  const role = req.body.key == "adminKey" ? "admin" : "user";
  await setRole(role, res.locals.user.id);
  res.redirect("/");
};

const createUser = [
  validateUser,
  async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("sign-up", {
          errors: errors.array(),
        });
      }
      await addUser({
        email: req.body.email,
        password: hashedPassword,
        fullname: req.body.fullname,
        role: req.body.role,
      });
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

const createMessage = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("newMessage", {
        errors: errors.array(),
      });
    }
    await addMessage({
      email: res.locals.user.email,
      fullname: res.locals.user.fullname,
      message: req.body.message,
    });
    res.redirect("/");
  },
];

const deleteMessage = async function (req, res) {
  await dbMsgDelete(req.params.messageId);
  res.redirect("/");
};

const getSignUp = async function (req, res) {
  res.render("sign-up");
};

const getLogin = async function (req, res) {
  res.render("log-in");
};

const getNewMessage = async function (req, res) {
  res.render("newMessage");
};

export {
  getMessages,
  createUser,
  createMessage,
  deleteMessage,
  getSignUp,
  getLogin,
  updateRole,
  getNewMessage,
};
