import express from "express";
import {
  addSlide,
  deleteSlide,
  getSlide,
  updateSlide,
} from "../controller/slideController.js";
import { onlyAdmin } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/slide", onlyAdmin, addSlide);
router.put("/slide/:id", onlyAdmin, updateSlide);
router.get("/slide", onlyAdmin, getSlide);
router.delete("/slide/:id", onlyAdmin, deleteSlide);

export default router;
