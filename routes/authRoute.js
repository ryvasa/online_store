import express from "express";
import { onlyAdmin, verifyToken } from "../middleware/verifyUser.js";
import {
  adminSignIn,
  getFirst,
  getMe,
  signIn,
  signOut,
  signUp,
} from "../controller/authController.js";
const router = express.Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/admin/signin", adminSignIn);
router.delete("/signout/:id", signOut);
router.get("/me", verifyToken, getMe);
router.get("/first/:id", getFirst);
export default router;
