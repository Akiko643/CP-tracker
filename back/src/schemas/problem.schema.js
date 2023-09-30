import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Not Attempted",
    },
    difficulty: {
      type: String,
      default: "N/A",
    },
    metaCognition: {
      type: String,
    },
    takeaways: String,
    analysis: String,
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Problem = mongoose.model("problems", ProblemSchema);
