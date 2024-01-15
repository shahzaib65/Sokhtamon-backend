const contactusModel = require("../model/contactUsModel");
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const uploadContactUs = async (req, res) => {
    try {
    
  const{email,description,telephone,subject,name} = req.body;

  let mailOption = {
    from: process.env.SMTP_MAIL,
    to: "sokhtamon@gmail.com",
    subject: "Отправка новой контактной формы",
    text: `Email: ${email}\nDescription: ${description}\nTelephone: ${telephone}\nSubject:${subject}\n Fullname: ${name}`,
  };

  transporter.sendMail(mailOption, function (error) {
    if (error) {
      res.status(404).json(error);
    } else {
      res.status(200).json("Сообщение успешно отправлено.");
    }
  });


//   await contactusModel.create({
//     email: req.body.email,
//   description: req.body.description,
//   telephone: req.body.telephone,
//   subject: req.body.subject
// });

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