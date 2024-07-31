const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    recepient: {
      type: String,
      required: true,
    },
    sentiment: {
      type: String,
    },

    chatId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
