const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const policeSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Police = mongoose.model("Police", policeSchema);
module.exports = Police;
