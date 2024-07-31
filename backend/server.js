const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(express.json());
app.use(cors());
require("dotenv").config();
const mongoose = require("mongoose");
const statsRouter = require("./routes/statistics");
const messagesRouter = require("./routes/chat");
const usersRouter = require("./routes/users");
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/chat", messagesRouter);
app.use("/api/v1/statistics", statsRouter);
let uri = "";
if (process.env.NODE_ENV === "production") {
  uri = process.env.PROD_ATLAS_URI;
} else {
  uri = process.env.TEST_ATLAS_URI;
}
mongoose.connect(uri);
const client = mongoose.connection;

client.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is online on port: ${PORT}`);
});
