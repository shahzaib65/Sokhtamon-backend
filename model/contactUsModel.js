const mongoose = require("mongoose")
const contactSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  subject: {
    type: String
  },
  telephone: {
    type: String
  },
  description: {
    type: String
  }

},
{
  timestamps: true,
});

module.exports = mongoose.model("Contact",contactSchema);