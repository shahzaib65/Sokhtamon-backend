const categoryModel = require("../model/categoryModel");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret: process.env.CLOUDSECRET,
});

const uploadCategory = async (req, res) => {
  try {
    if (!req?.files?.image)
      return res.status(400).send("Please upload an image");
    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "category",
    });

    if (result) {
      const category = await categoryModel.create({
        categoryName: req.body.name,
        category_image_url: result.secure_url,
      });
      res.status(200).json({ data: category });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const fetchCategory = async(req,res)=>{
   try {
    const category = await categoryModel.find()
    res.status(200).json({categories: category})
   } catch (error) {
     res.status(500).json(error.message)
   }
}

const updateCategory = async(req,res)=>{
  try {
    const data = await categoryModel.findOne({_id: req.params.id });
       await Course.findByIdAndUpdate(
        { _id: data._id },
        { $set: { category_name: req.body.name} },
        { new: true }
      );
      res.status(200).json('Your category title has been updated'
        );
  } catch (error) {
    res.status(500).json( error.message )
  }
}

const deleteCategory = async(req,res)=>{
  try {
    const { id } = req.params;
    const cat = await categoryModel.findByIdAndDelete(id);
    if (!cat) {
      return res.status(400).json("Category not found");
    }
    res.status(200).send("Category deleted successfully");
  } catch (error) {
    res.status(400).send(error.message)
  }
}




module.exports = {
  uploadCategory,
  fetchCategory,
  updateCategory,
  deleteCategory
};
