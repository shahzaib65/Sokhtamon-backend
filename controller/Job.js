const jobModel = require("../model/jobModel");

const uploadJob = async (req, res) => {
    try {
    
       await jobModel.create({
            service: req.body.service,
          city: req.body.city,
          full_name: req.body.full_name,
          price: req.body.price,
          experience: req.body.experience

        });
        res.status(200).json("Job posted");
      
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  const fetchJob = async(req,res)=>{
    try {

        const { city, service } = req.query;
        const query = {};

        if (city) {
            query.city = city;
          }
          if (service) {
            query.service = { $gte: service };
          }
          const jobs = await jobModel.find(query);
          res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json(error.message)
    }
 }

  module.exports = {
    uploadJob,
    fetchJob
  }