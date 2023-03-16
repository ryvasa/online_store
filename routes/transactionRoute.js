import express from "express";
import {
  deleteTransaction,
  getAllTransaction,
  getTransactionById,
} from "../controller/transactionController.js";
import { onlyAdmin } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/transaction", onlyAdmin, getAllTransaction);
router.get("/transaction/:id", onlyAdmin, getTransactionById);
router.delete("/transaction/:id", onlyAdmin, deleteTransaction);

export default router;
