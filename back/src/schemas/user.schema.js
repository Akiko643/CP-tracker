import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
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
  },
  { timestamps: true }
);

export const User = mongoose.model("users", UserSchema);
