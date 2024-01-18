const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts"
  },
  paymentMode: {
    type: String,
  },
  plan: {
    type: String,
    default: "free"
  },
  paymentStatus: {
    type: String,
    default: "pending",
  },
  totalAmount: {
    type: String,
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model("Subscription",subscriptionSchema)
