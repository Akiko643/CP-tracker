import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    passwordHash: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("users", UserSchema);
