const jobModel = require("../model/jobModel");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret: process.env.CLOUDSECRET,
});

const uploadJob = async (req, res) => {
  try {
    if (!req?.files?.image)
      return res.status(400).send("Please upload an image");
    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "jobs",
    });
    if (result) {
      await jobModel.create({
        service: req.body.service,
        city: req.body.city,
        full_name: req.body.full_name,
        price: req.body.price,
        experience: req.body.experience,
        heading: req.body.heading,
        description: req.body.description,
        job_url: result.secure_url,
        public_id: result.public_id,
        asset_id: result.asset_id,
        telephone: req.body.telephone
      });
      res.status(200).json("Job posted");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const fetchJob = async (req, res) => {
  try {
    const { city, service } = req.query;
    console.log(req.query)
    const query = {};

    if (city) {
      query.city = city;
    }
    if (service) {
      query.service = { $gte: service };
    }
    const jobs = await jobModel.find({city: city,service: service});
    res.status(200).json(jobs);
  }catch (error) {
    res.status(500).json(error.message);
  }
};

const fetchJobById = async(req,res)=>{
  try {

    const data = await jobModel.findOne({"_id": req.params.id})
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  uploadJob,
  fetchJob,
  fetchJobById
};
