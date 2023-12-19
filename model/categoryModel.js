const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    category_image_url: {
        type: String
    },
    categoryName: {
        type: String
    }
},
{
  timestamps: true,
});
module.exports = mongoose.model("Categories",categorySchema)