const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reporterSchema = new mongoose.Schema(
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
const Reporter = mongoose.model("Reporter", reporterSchema);
module.exports = Reporter;
