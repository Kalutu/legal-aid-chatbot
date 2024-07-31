const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const adminSchema = new mongoose.Schema(
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
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
