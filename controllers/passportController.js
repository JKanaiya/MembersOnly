import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as db from "../db/index.js";
import bcrypt from "bcryptjs";

const pSession = passport.session();

const logOut = function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  }),
);
const loginAuthenticate = passport.authenticate("local", {
  successRedirect: "/",
  // TODO: Add correct routing on failure to auth
  failureRedirect: "/log-in",
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export { pSession, loginAuthenticate, logOut };
