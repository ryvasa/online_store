import express from "express";
import {
  addOrder,
  // deleteTrans,
  getAllOrder,
  getOrderById,
  getOrderByUserId,
  getOrderStats,
  updateOrderStatus,
} from "../controller/orderController.js";
import { onlyAdmin, verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/orders", verifyToken, addOrder);
router.get("/orders", onlyAdmin, getAllOrder);
router.get("/orders/stats", onlyAdmin, getOrderStats);
router.get("/orders/find", verifyToken, getOrderByUserId);
router.get("/orders/:id", verifyToken, getOrderById);
router.put("/orders/:id", onlyAdmin, updateOrderStatus);
// router.delete("/order", onlyAdmin, deleteTrans);

export default router;
