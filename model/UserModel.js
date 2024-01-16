const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String
    },
    first_name: {
      type: String,
      default: "optional"
    },
    last_name: {
      type: String,
      default: "optional"
    },
    gender: {
      type: String,
      default: "optional"
    },
    profile_url:{
      type: String,
      default: "optional"
    },
    asset_id: {
      type: String,
      default: "optional"
    },
    mobile_number: {
      type: String,
      default: "optional"
    },
    role: {
      type: String,
      default: "user",
    },
    otp: {
      type: String
    },
    profile_complete:{
      type: Boolean,
      default: false
    },
    subscription: {
      sub_id: String
    },
    login: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);


