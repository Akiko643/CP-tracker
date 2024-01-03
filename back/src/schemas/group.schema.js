import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  { timestamps: true}
);

export const Group = mongoose.model("groups", GroupSchema);
