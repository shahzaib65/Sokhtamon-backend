const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema({
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // paymentMethod: {
  //   type: String,
  //   required: true,
  // },
  // paymentStatus: {
  //   type: String,
  //   default: "pending",
  // },
  // status: {
  //   type: String,
  //   default: "pending",
  // },
  totalAmount: {
    type: Number,
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model("Subscription",subscriptionSchema)
