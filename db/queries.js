import * as db from "./index.js";

const getAllMessages = async function () {
  const { rows } = await db.query("SELECT * FROM messages");
  return rows;
};

const getUser = async function () {};

const addMessage = async function (message) {
  await db.query(
    "INSERT INTO messages (email, fullname, text, time) VALUES ($1, $2, $3, $4)",
    [message.email, message.fullname, message.message, new Date()],
  );
};

const addUser = async function (user) {
  await db.query(
    "INSERT INTO users (email, fullname, password, role) VALUES ($1, $2, $3, $4)",
    [user.email, user.fullname, user.password, user.role],
  );
};

const dbMsgDelete = async function (messageId) {
  await db.query("DELETE FROM messages WHERE id = $1", [messageId]);
};

const getRole = async function (user) {
  const { role } = await db.query("SELECT role from users WHERE id = $1", [
    user.id,
  ]);
};

const setRole = async function (role, id) {
  await db.query("UPDATE users SET role = $1 WHERE id = $2", [role, id]);
};

export { getAllMessages, addUser, addMessage, dbMsgDelete, getRole, setRole };
