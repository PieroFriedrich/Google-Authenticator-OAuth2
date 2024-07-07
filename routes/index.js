// index.js
import express from "express";
import passport from "passport";
import "./auth.js"; // Ensure the passport configuration is loaded

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Yay node!",
    loginUrl: "/auth/google",
    user: req.user,
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/failure",
  })
);

router.get("/auth/failure", (req, res) => {
  res.send("Something went wrong.");
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/print-sessions", (req, res) => {
  const sessionStore = req.sessionStore;
  sessionStore.all((err, sessions) => {
    if (err) {
      console.error("Error fetching sessions:", err);
      res.status(500).send("Failed to fetch sessions");
      return;
    }
    res.send(sessions);
  });
});

export default router;
