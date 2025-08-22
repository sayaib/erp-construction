import bcryptjs from "bcryptjs";
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

import { Project } from "../models/projectSchema.js";

export const submitBBQ = asyncHandler(async (req, res) => {
  const { projectCode, projectName, projectDescription, items } = req.body;

  // Validate data
  if (
    !projectName ||
    !projectDescription ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Project data is incomplete or items are missing" });
  }

  try {
    // Create a new project with the items
    const newProject = new Project({
      projectCode,
      projectName,
      projectDescription,
      items,
    });

    // Save the new project to the database
    await newProject.save();

    res
      .status(201)
      .json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET route to fetch all projects
export const getBBQ = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const projects = await Project.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Project.countDocuments();
    res.json({ projects, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const getLastBBQID = asyncHandler(async (req, res) => {
  try {
    const lastProject = await Project.findOne().sort({ createdAt: -1 });
    const projectCode = lastProject ? lastProject.projectCode : null;

    // Split the string by "/"
    const parts = projectCode.split("/");

    // Get the last part and convert it to an integer (if needed)
    const lastInsertedId = parseInt(parts[parts.length - 1]);
    console.log(lastInsertedId);
    res.json({ lastInsertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
