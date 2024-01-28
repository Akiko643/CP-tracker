import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    groupIds: {
      type: [mongoose.Schema.Types.ObjectId],
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
      default: "Todo", // "Solving", "Skipped", "Solved"
    },
    difficulty: {
      type: String,
      default: "N/A",
    },
    spentTime: {
      type: Number,
      default: 0,
    },
    startDate: Date,
    solvedDate: Date,
    metaCognition: String,
    takeaways: String,
    analysis: String,
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Problem = mongoose.model("problems", ProblemSchema);
