const mongoose = require("mongoose");
const jobSchema = mongoose.Schema(
  {
    service: {
      type: String,
    },
    city: {
      type: String,
    },
    full_name: {
      type: String,
    },
    job_url: {
      type: String,
    },
    heading: { type: String },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    experience: {
      type: String,
    },
    asset_id: {
      type:String
    },
    public_id: {
      type: String
    },
    telephone: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Job", jobSchema);
