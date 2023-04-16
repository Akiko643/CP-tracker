import mongoose, { Schema, model, models } from "mongoose";

export const ProblemSchema = new Schema(
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
        takeAways: String,
        Analysis: String,
        tags: {
            type: [String],
        },
    },
    { timestamps: true }
);

export const Problem = models.Problem || model("Problem", ProblemSchema);
