import express from "express";
import {
  addCart,
  deleteProductOnCart,
  getAllProductOnCart,
  updateQuantity,
} from "../controller/cartController.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/cart", verifyToken, addCart);
router.get("/cart", verifyToken, getAllProductOnCart);
router.put("/cart/:id", verifyToken, updateQuantity);
router.delete("/cart/:id", verifyToken, deleteProductOnCart);

export default router;
