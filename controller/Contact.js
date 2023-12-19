const contactusModel = require("../model/contactUsModel");

const uploadContactUs = async (req, res) => {
    try {
    
        const contact = await contactusModel.create({
            email: req.body.email,
          description: req.body.description,
          telephone: req.body.telephone,
          subject: req.body.subject
        });
        res.status(200).json({ data: contact });
      
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  const fetchContacts = async(req,res)=>{
    try {
     const contact = await contactusModel.find()
     res.status(200).json({ContactUs: contact})
    } catch (error) {
      res.status(500).json(error.message)
    }
 }

  module.exports = {
    uploadContactUs,
    fetchContacts
  }