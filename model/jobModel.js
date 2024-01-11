const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
    service: {
        type: String
    },
    city: {
        type: String
    },
    full_name:{
        type: String
    },
    price: {
        type: String
    },
    experience: {
        type: String
    }
},
{
  timestamps: true,
});
module.exports = mongoose.model("Job",jobSchema)