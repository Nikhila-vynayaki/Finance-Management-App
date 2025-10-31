const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🟢 Incoming login body:", req.body);

    // 1. Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid login credentials",
      });
    }

    // 2. Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid login credentials",
      });
    }

    // 3. Create JWT token
    const token = createToken(user._id);

    // 4. Return user + token
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error in login controller: ${error.message}`,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedpwd = await bcrypt.hash(password, 10);
    const newUser = new userModel({ ...req.body, password: hashedpwd });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `Error in register controller ${error}`,
    });
  }
};
module.exports = { loginController, registerController };
