import { addMessage, getAllMessages } from "../db/queries.js";

const getMessages = async function (req, res) {
  const messages = await getAllMessages();
  console.log(req.body.user);
  const user = req.body.user;
  res.render("index", {
    messages: messages,
    user: user,
  });
};

const createUser = async function (req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
};

const createMessage = async function (req, res) {
  await addMessage({
    email: req.body.email,
    fullname: req.body.fullname,
    text: req.body.text,
  });
  res.redirect("/");
};

const deleteMessage = async function (req, res) {
  await deleteMessage(req.query.messageId);
  res.redirect("/");
};

const getSignUp = async function (req, res) {
  res.render("sign-up");
};

const getLogin = async function (req, res) {
  res.render("log-in");
};

const getNewMessage = async function (req, res) {
  res.redirect("newMessage");
};

export {
  getMessages,
  createUser,
  createMessage,
  deleteMessage,
  getSignUp,
  getLogin,
  getNewMessage,
};
