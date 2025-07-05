import * as db from "./index.js";
import bcrypt from "bcryptjs";

const getAllMessages = async function () {
  const { rows } = await db.query("SELECT * FROM messages");
  return rows;
};

const getUser = async function () {};

const addMessage = async function (message) {
  await db.query(
    "INSERT INTO messages (email, fullname, text, time) VALUES ($1, $2, $3, $4)",
    [message.email, message.fullname, message.text, new Date()],
  );
};

const addUser = async function (user) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.query(
    "INSERT INTO users (email, fullname, password, role) VALUES ($1, $2, $3, $4)",
    [user.email, user.fullname, hashedPassword, user.role],
  );
};

const deleteMessage = async function (message) {
  await db.query("DELETE FROM messages WHERE id = $1", [message.id]);
};

const getRole = async function (user) {
  const { role } = await db.query("SELECT role from users WHERE id = $1", [
    user.id,
  ]);
};

const setRole = async function (role, user) {
  await db.query("UPDATE users SET role = $1 WHERE id = $2", [role, user.id]);
};

export { getAllMessages, addUser, addMessage, deleteMessage, getRole, setRole };
