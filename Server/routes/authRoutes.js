import express from "express";
import { registerUser, loginUser ,activateUser, getUsers} from "../controllers/authController.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);
router.post("/activate-user", activateUser);
router.post("/get-user", getUsers);

export default router;
