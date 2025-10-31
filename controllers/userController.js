const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🟢 Incoming login body:", req.body); // Add this line
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Invalid Login`,
      });
    }
    // // 2️⃣ Compare passwords
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(404).json({
    //     success: false,
    //     message: `Error in login controller`,
    //   });
    // }
    // 3️⃣ Successful login
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error in login controller ${error}`,
    });
  }
};

// const registerController = async (req, res) => {
//   try {
//     const newUser = new userModel(req.body);
//     // 3️⃣ Validate user data
//     if (!newUser.email || !newUser.password || newUser.password.length < 6) {
//       throw new Error("Invalid user data");
//     }
//     if (!validator.isEmail(newUser.email)) {
//       throw new Error("Invalid email format");
//     }
//     if (!validator.isStrongPassword(newUser.password)) {
//       throw new Error("Password is not strong enough");
//     }
//     // 4️⃣ Check if email already exists
//     const existingUser = await userModel.findOne({ email: newUser.email });
//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already registered",
//       });
//     }

//     //create token
//     const token = createToken(newUser._id);

//     // 5️⃣ Hash the password
//     const salt = await bcrypt.genSalt(10);
//     newUser.password = await bcrypt.hash(newUser.password, salt);
//     await newUser.save();
//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: newUser,
//       token,
//     });
//   } catch (error) {
//     return res.status(400).send({
//       success: false,
//       message: `Error in register controller ${error}`,
//     });
//   }
// };
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
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
