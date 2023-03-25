import express from "express";
import {
  addSlide,
  deleteSlide,
  getSlide,
  updateSlide,
  getSlideById,
} from "../controller/slideController.js";
import { onlyAdmin } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/slide", onlyAdmin, addSlide);
router.get("/slide/:id", onlyAdmin, getSlideById);
router.put("/slide/:id", onlyAdmin, updateSlide);
router.get("/slide", getSlide);
router.delete("/slide/:id", onlyAdmin, deleteSlide);

export default router;
