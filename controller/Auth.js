const jwt = require("jsonwebtoken");
const userModel = require("../model/UserModel");
const generateOTP = require("../service/generateOtp");
const moment = require('moment');
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

//create token structure
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
};

const loginUser = async (req, res) => {

  const {email} = req.body
  const {mobile} = req.body

 // const user = await userModel.findOne({ mobile_number: req.body.mobile });

 const user = await userModel.findOne({
  $or: [{ email: email }, { mobile_number: mobile }],
});
  if (!user) {
    const otp = generateOTP();
    const data = await userModel.create({
      mobile_number: mobile,
      email: email,
      role: req.body.role,
      otp: otp,
    });

    let mailOption = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Отп код от Сохтамон",
      text: `Your otp is: ${otp} will expire after one minute`,
    };
    transporter.sendMail(mailOption, function (error) {
      if (error) {
        res.status(404).send(error);
      } else {
        res
          .status(200)
          .json("check your email" );
      }
    });

    const token = createToken(data._id);
    const role = data.role;
    res.status(200).json({ token, role });
  } else {
    const otp = generateOTP();
    let mailOption = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Отп код от Сохтамон",
      text: `Your otp is: ${otp} will expire after one minute`,
    };
    transporter.sendMail(mailOption, function (error) {
      if (error) {
        res.status(404).send(error);
      } else {
        res
          .status(200)
          .json("check your email" );
      }
    });

    const token = createToken(user._id);
    const role = user.role;
    await userModel.findByIdAndUpdate(
      { _id: user._id },
      { $set: { otp: otp } },
      { new: true }
    );
    res.status(200).json({ token, role });
  }
};

function isOTPExpired(createdAt) {
  const expirationTime = moment(createdAt).add(1, 'minute'); // OTP expires after 2 minutes
  return moment() > expirationTime;
}


const verifyOtp = async (req, res) => {
  const user = await userModel.findOne({ otp: req.body.otp });
  if (user) {
    const isExpired = isOTPExpired(user.updatedAt);
    if(isExpired){
      res.status(404).json("Your otp is expired");
    }else{
      await userModel.findByIdAndUpdate(
        { _id: user._id },
        { $set: { otp: "" } },
        { new: true }
      );
      res.status(200).json("Your otp verified");
    }
  }else{
    res.status(404).json("Otp not found")
  }
};

const fetchUser = async(req,res)=>{
  try {
    
   const user = await userModel.find({});
   res.status(200).json({user});

  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = {
  loginUser,
  verifyOtp,
  fetchUser
};
