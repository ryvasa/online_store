import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  addStock,
  getProductStats,
  getBestSellerProduct,
  getAllStoreProduct,
} from "../controller/productController.js";
import { onlyAdmin } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/products", onlyAdmin, addProduct);
router.get("/products/store", getAllStoreProduct);
router.get("/bestseller", getBestSellerProduct);
router.get("/products/stats", onlyAdmin, getProductStats);
router.get("/products", getAllProduct);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.post("/stock/:id", addStock);
router.delete("/products/:id", onlyAdmin, deleteProduct);

export default router;
