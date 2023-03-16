import express from "express";
import {
  addOrder,
  // deleteTrans,
  getAllOrder,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
} from "../controller/orderController.js";
import { onlyAdmin, verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/order", verifyToken, addOrder);
router.get("/order", onlyAdmin, getAllOrder);
router.get("/order/find", verifyToken, getOrderByUserId);
router.get("/order/:id", verifyToken, getOrderById);
router.put("/order/:id", onlyAdmin, updateOrderStatus);
// router.delete("/order", onlyAdmin, deleteTrans);

export default router;
