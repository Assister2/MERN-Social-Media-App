const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// import profile model
const Profile = require("../../models/Profile");

// import user profile
const User = require("../../models/User");

// @access: public
router.get("/test", (req, res) => res.json({ msg: "Profile.js working" }));

// Get current user profile
// @access: private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// create user profile
// @access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);
module.exports = router;
