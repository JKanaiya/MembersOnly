import path from "node:path";
import express from "express";
import "dotenv/config.js";
import { pSession } from "./controllers/passportController.js";
import session from "express-session";
import indexRouter from "./routes/indexRouter.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));
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
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(indexRouter);

const PORT = process.env.HOST || 3000;
app.listen(PORT, () => {
  `Express listening on PORT: ${PORT}`;
});
