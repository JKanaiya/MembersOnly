import path from "node:path";
import express from "express";
import "dotenv/config.js";
import { pSession } from "./controllers/passportController.js";
import session from "express-session";
import indexRouter from "./routes/indexRouter.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(import.meta.dirname, "views"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.set("view engine", "ejs");
app.use(pSession);
app.use(indexRouter);

const PORT = process.env.HOST || 3000;
app.listen(PORT, () => {
  `Express listening on PORT: ${PORT}`;
});
