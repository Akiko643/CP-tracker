import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: String,
    passwordHash: String,
    eachDay: [
      {
        date: Date,
        time: Number,
        numOfProblems: {
          type: Number,
          default: 0,
        },
      },
    ],
    eachMonth: [
      {
        year: Number,
        month: Number,
        time: Number,
        numOfProblems: {
          type: Number,
          default: 0,
        },
      },
    ],
    lastRecommendIndex: Number,
  },
  { timestamps: true }
);

export const User = mongoose.model("users", UserSchema);
