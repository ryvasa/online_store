import express from "express";
import {
  addMessage,
  deleteMessage,
  getAllMessage,
} from "../controller/messageController.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/messages", verifyToken, getAllMessage);
router.post("/messages", verifyToken, addMessage);
router.delete("/messages/:id", verifyToken, deleteMessage);

export default router;
