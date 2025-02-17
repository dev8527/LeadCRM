import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    company: String,
    linkedin: String,
    website: String,
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
