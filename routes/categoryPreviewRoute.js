import express from "express";
import {
  addCatPreview,
  deleteCatPreview,
  getCatPreview,
  updateCatPreview,
} from "../controller/categoryPreviewController.js";
import { onlyAdmin } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/cat_preview", onlyAdmin, addCatPreview);
router.put("/cat_preview/:id", onlyAdmin, updateCatPreview);
router.get("/cat_preview", onlyAdmin, getCatPreview);
router.delete("/cat_preview/:id", onlyAdmin, deleteCatPreview);

export default router;
