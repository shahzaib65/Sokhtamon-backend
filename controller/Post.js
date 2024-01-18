const postModel = require("../model/postModel");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret: process.env.CLOUDSECRET,
});

const uploadPost = async (req, res) => {
  try {
    if (!req?.files?.image)
      return res.status(400).send("Please upload an image");
    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "posts",
    });
    if (result) {
      const post = await postModel.create({
        category_name: req.body.category_name,
        sub_category_name: req.body.sub_category_name,
        post_image_url: result.secure_url,
        post_heading: req.body.post_heading,
        post_status: req.body.post_status,
        city: req.body.city,
        state: req.body.state,
        username: req.body.username,
        price:req.body.price,
        email: req.body.email,
        description: req.body.description,
        telephone: req.body.telephone,
        youtube_link: req.body.youtube_link,
        tiktok_link: req.body.tiktok_link

      });
      res.status(200).json({ data: post });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};



const fetchPost = async(req,res)=>{
   try {
    let condition ={};
    if(!req.query.admin){
      condition.deleted = {$ne:true}
    }

   let query =  postModel.find(condition);
   let totalPostQuery = postModel.find(condition);
 
    if (req.query.category_name) {
     // query =  query.find({category_name: req.query.category_name});
     query = query.find({ category_name: {$in:req.query.category_name.split(',')} });
    totalPostQuery = totalPostQuery.find({
      category_name: {$in:req.query.category_name.split(',')},
    });
    }

    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

   if(req.query._page && req.query._limit){
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize*(page-1)).limit(pageSize);
   }

   const totalDocs = await totalPostQuery.count().exec();
  

   const data = await query.exec();
   res.set('X-Total-Count', totalDocs);
   res.status(200).json({posts: data})

   } catch (error) {
     res.status(500).json(error.message)
   }
}

const fetchAllPosts = async(req,res)=>{
  try {
    
    const model = await postModel.find();
    res.status(200).json(model)

  } catch (error) {
    res.status(200).json(error.message)
  }
}



 const fetchPostById = async(req,res)=>{
  try {

    const data = await postModel.findOne({"_id": req.params.id})
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error.message);
  }
 }

 const updatePost = async(req,res)=>{
  try {
    const data = await postModel.findOne({_id: req.params.id });
       await postModel.findByIdAndUpdate(
        { _id: data._id },
        { $set: { plan: req.body.status} },
        { new: true }
      );
      res.status(200).json('Post has been updated');
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const deletePost = async(req,res)=>{
  try {
    const { id } = req.params;
    const cat = await postModel.findByIdAndDelete(id);
    if (!cat) {
      return res.status(400).json("Post not found");
    }
    res.status(200).json("Post deleted successfully");
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = {
  uploadPost,
  fetchPost,
  fetchPostById,
  updatePost,
  deletePost,
  fetchAllPosts

};
