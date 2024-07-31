const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },

    phonenumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    incident: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
