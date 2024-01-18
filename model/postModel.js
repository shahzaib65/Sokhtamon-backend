const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
  category_name: {
    type: String
  },
  sub_category_name: {
    type: String
  },
  post_heading: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  post_status: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  telephone:{
    type: String
  },
  description: {
    type: String
  },
  youtube_link: {
    type: String,
    default: ""
  },
  tiktok_link: {
    type: String,
    default: ""
  },
  post_image_url:{
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 0
  },
  status: {
    type: Boolean,
    default: false
  },
  subscription: {
    type: String,
    default: "Стандартный"
  },
  userId: {
    type: String,
    default: "userid"
  },
  plan: {
    type: String,
    default: "Стандартный"
  }
},{
  timestamps: true
});
module.exports = mongoose.model("Posts",postSchema)