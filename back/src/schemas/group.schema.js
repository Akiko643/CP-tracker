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
    },
    problemIds: {
      type: [mongoose.Schema.Types.ObjectId]
    }
  },
  { timestamps: true}
);

export const Group = mongoose.model("groups", GroupSchema);
