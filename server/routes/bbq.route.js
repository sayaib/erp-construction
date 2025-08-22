import express from "express";
import {
  submitBBQ,
  getBBQ,
  getLastBBQID,
} from "../controllers/bbq.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/project", submitBBQ);
router.get("/showProject", getBBQ);
router.get("/lastBBQ", getLastBBQID);

export default router;
