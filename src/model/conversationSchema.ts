import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation =
  mongoose.models.conversations ||
  mongoose.model("conversations", conversationSchema);

export default Conversation;
