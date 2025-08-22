import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
router.get("/users", getUsers);

export default router;
