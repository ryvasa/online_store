import express from "express";
import {
  addAdminChat,
  addClientChat,
  deleteChat,
  getAllChat,
  getChatById,
  getClientChat,
} from "../controller/chatController.js";
import { onlyAdmin, verifyToken } from "../middleware/verifyUser.js";
const router = express.Router();

router.get("/chats/all", onlyAdmin, getAllChat);
router.delete("/chats/:id", onlyAdmin, deleteChat);
router.post("/chats/admin/add/:id", onlyAdmin, addAdminChat);
router.get("/chats/admin/:id", onlyAdmin, getChatById);
router.get("/chats/client", verifyToken, getClientChat);
router.post("/chats/client/add", verifyToken, addClientChat);

export default router;
