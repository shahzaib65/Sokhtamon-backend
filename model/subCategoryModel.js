const mongoose = require("mongoose")
const subCategortSchema = new mongoose.Schema({
    category_id: {
        type: String
    },
    sub_category_name: {
        type: String
    }
});
module.exports = mongoose.model("SubCategories",subCategortSchema)