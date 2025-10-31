const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

const router = express.Router();

//routes

//login route
router.post("/login", loginController);

//register route
router.post("/register", registerController);

module.exports = router;
