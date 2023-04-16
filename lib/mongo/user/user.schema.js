import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        passwordHash: String,
    },
    { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
