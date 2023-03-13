import express from "express";
import { onlyAdmin, verifyToken } from "../middleware/verifyUser.js";
import {
  getFirst,
  getMe,
  signIn,
  signOut,
  signUp,
} from "../controller/authController.js";
const router = express.Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.delete("/signout", signOut);
router.get("/me", verifyToken, getMe);
router.get("/first/:id", getFirst);
export default router;
