const cityModel = require("../model/cityModel");

const uploadCity = async (req, res) => {
  try {
    const city = await cityModel.create({
      city_name: req.body.city,
    });
    res.status(200).json({ data: city });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const fetchCity = async(req,res)=>{
    try {
     const city = await cityModel.find()
     res.status(200).json({Cities: city})
    } catch (error) {
      res.status(500).json(error.message)
    }
 }

module.exports = {
  uploadCity,
  fetchCity
};
