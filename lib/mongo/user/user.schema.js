import mongoose, { Schema, model, models } from "mongoose";

export const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: String,
    },
    { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
