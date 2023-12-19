const mongoose = require("mongoose")
const citySchema = new mongoose.Schema({
    city_name: {
        type: String
    }
},
{
  timestamps: true,
});
module.exports = mongoose.model("City",citySchema)