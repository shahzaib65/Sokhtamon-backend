const subCategoryModel = require("../model/subCategoryModel");

const uploadSubCategory = async (req, res) => {
    try {
    
        const subCategory = await subCategoryModel.create({
            sub_category_name: req.body.name,
          category_id: req.body.id,
        });
        res.status(200).json({ data: subCategory });
      
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  const fetchSubCategory = async(req,res)=>{
    try {
     const category = await subCategoryModel.find({category_id: req.body.id})
     res.status(200).json({subCategories: category})
    } catch (error) {
      res.status(500).json(error.message)
    }
 }

  module.exports = {
    uploadSubCategory,
    fetchSubCategory
  }