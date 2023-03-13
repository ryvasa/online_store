import express from "express";
import { addCart } from "../controller/cartController.js";
import { onlyAdmin, verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/cart", verifyToken, addCart);
// router.get("/cart", getAllProduct);
// router.get("/cart/:id", getProductById);
// router.put("/cart/:id", updateProduct);
// router.delete("/cart/:id", onlyAdmin, deleteProduct);

export default router;
