const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String
    },
    username: {
      type: String
    },
    mobile_number: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    otp: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);


