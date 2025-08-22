import bcryptjs from "bcryptjs";
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
// import {
// 	sendPasswordResetEmail,
// 	sendResetSuccessEmail,
// 	sendVerificationEmail,
// 	sendWelcomeEmail,
// } from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";

export const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await User.countDocuments();
    res.json({ users, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
