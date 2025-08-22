import mongoose from "mongoose";

// Define the schema for the project
const projectSchema = new mongoose.Schema(
  {
    projectCode: { type: String, required: true },
    projectName: { type: String, required: true },
    projectDescription: { type: String, required: true },
    items: [
      {
        id: { type: Number, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        unitPrice: { type: Number, required: true },
      },
    ], // Embed the item schema directly
  },
  { timestamps: true }
);

export const Project = mongoose.model("Projects", projectSchema);
