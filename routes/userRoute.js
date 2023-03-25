import express from "express";
import {
  addUser,
  deleteUser,
  getAllUser,
  getUserById,
  getUserStats,
  updateUser,
} from "../controller/userController.js";
import { onlyAdmin } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/users", onlyAdmin, addUser);
router.get("/users", onlyAdmin, getAllUser);
router.get("/users/stats", onlyAdmin, getUserStats);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", onlyAdmin, deleteUser);

export default router;
