const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/outlook",
  passport.authenticate("windowslive", {
    scope: ["openid", "email", "offline_access"],
  })
);

router.get(
  "/outlook/callback",
  passport.authenticate("windowslive", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
