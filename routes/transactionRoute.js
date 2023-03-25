import express from "express";
import {
  deleteTransaction,
  getAllTransaction,
  getTransactionById,
  getTransactionStats,
} from "../controller/transactionController.js";
import { onlyAdmin } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/transactions", onlyAdmin, getAllTransaction);
router.get("/transactions/stats", onlyAdmin, getTransactionStats);
router.get("/transactions/:id", onlyAdmin, getTransactionById);
router.delete("/transactions/:id", onlyAdmin, deleteTransaction);

export default router;
