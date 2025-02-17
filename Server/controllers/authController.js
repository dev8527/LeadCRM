import User from "../models/User.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import bcrypt from 'bcryptjs';

import ejs from "ejs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a random activation code
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const coins = 10;

    // Create new user
    user = new User({ name, email, password, activation_code: activationCode, coins });
    await user.save();

    const { token } = createActivationToken(user);
    const data = { user: { name: user.name }, activationCode };
    const templatePath = join(__dirname, "../mails/activation-mail.ejs");

    const html = await ejs.renderFile(templatePath, data);

    // Send activation email
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        template: "activation-mail.ejs",
        data,
      });

      return res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) to activate your account!`,
        activationToken: token,
      });
    } catch (error) {
      return next(new Error(error.message));
    }

    // res.status(201).json({ user });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, activationCode };
};
// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, isActive: true });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials activated your account" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const activateUser = async (req, res) => {
  const { activation_token, activation_code } = req.body;

  // Check if activation token and code are provided
  if (!activation_token) {
    return res.status(400).json({ message: "Activation token is required" });
  }
  if (!activation_code) {
    return res.status(400).json({ message: "Activation code is required" });
  }

  try {
    // Verify the activation token
    const decoded = jwt.verify(activation_token, process.env.JWT_SECRET);
    const { email } = decoded.user; // Assuming the email is stored in the JWT payload
    // Find the user by email and activation_code
    const user = await User.findOne({ email, activation_code });

    if (!user) {
      return res.status(400).json({ message: "Invalid activation code or user not found" });
    }

    // If everything is valid, activate the user
    user.isActive = true; // Assuming there is an 'isActive' field in your schema
    user.activation_code = null; // Clear the activation code
    await user.save();

    // Send successful response
    return res.status(200).json({
      success: true,
      message: "Account activated successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during activation:", error);

    // Handle JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Handle expired token errors
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }

    // Handle other unexpected errors
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const users = await User.find({ activation_token }).select("_id name email coins");

    // Manually rename `_id` to `user_Id`
    const formattedUsers = users.map(user => ({
      user_Id: user._id,
      name: user.name,
      email: user.email,
      coins: user.coins
    }));


    return res.status(200).json(formattedUsers);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}

