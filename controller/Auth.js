const jwt = require("jsonwebtoken");
const userModel = require("../model/UserModel");
const generateOTP = require("../service/generateOtp");
const moment = require("moment");
const nodemailer = require("nodemailer");
require("../service/config");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret: process.env.CLOUDSECRET,
});

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const loginWithfirebaseOtp = async (req, res) => {
  const { mobile } = req.body;
  const user = await userModel.findOne({ mobile_number: mobile });
  if (!user) {
    try {
      await userModel.create({
        mobile_number: mobile,
        role: req.body.role,
      });
      res.status(200).json("User registered");
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(200).json("User login");
  }
};

const loginUser = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await userModel.findOne({ email: email });
  //  const user = await userModel.findOne({
  //   $or: [{ email: email }, { mobile_number: mobile }],
  // });
  if (!user) {
    const otp = generateOTP();
    await userModel.create({
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
        res.status(200).json("проверьте свою электронную почту");
      }
    });
  } else {
    const otp = generateOTP();
    let mailOption = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Отп код от Сохтамон",
      text: `Ваш отп: ${otp} истекает через 10 минут`,
    };
    transporter.sendMail(mailOption, function (error) {
      if (error) {
        res.status(404).send(error);
      } else {
        res.status(200).json("проверьте свою электронную почту");
      }
    });

    await userModel.findByIdAndUpdate(
      { _id: user._id },
      { $set: { otp: otp } },
      { new: true }
    );
  }
};

function isOTPExpired(createdAt) {
  const expirationTime = moment(createdAt).add(10, "minutes"); // OTP expires after 2 minutes
  return moment() > expirationTime;
}

const verifyOtp = async (req, res) => {
  const user = await userModel.findOne({ otp: req.body.otp });
  if (user) {
    const isExpired = isOTPExpired(user.updatedAt);
    if (isExpired) {
      res.status(404).json("Срок действия вашего ОТП истек");
    } else {
      const data = await userModel.findByIdAndUpdate(
        { _id: user._id },
        { $set: { otp: "" } },
        { new: true }
      );
      res.status(200).json(data)
      // const payload = {
      //   id: data._id,
      //   role: data.role,
      //   login: data.login
      // };
      // const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      //   expiresIn: "24h",
      // });
      // res.status(200).json(token);
    }
  } else {
    res.status(404).json("Отп не найден");
  }
};

const fetchUser = async(req, res) => {
  try {
    const{id} = req.params;
    
    const user = await userModel.findOne({ _id: id });
    if(user){
      const data =  await userModel.findByIdAndUpdate(
        { _id: id },
        { $set: { login: true }},
        { new: true }
      );
      res.status(200).json(data);
    }
   


      // if(user.login === false){
      //   const data =  await userModel.findByIdAndUpdate(
      //     { _id: id },
      //     { $set: { login: true }},
      //     { new: true }
      //   );
      //   res.status(200).json(data);
      // }else{
        
     
      // }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const checkAuth = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json("Unauthorized - Token missing");
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json("Unauthorized - Invalid token");
      }
      // Token is valid
      console.log(decoded)
      res.json({ role: decoded.role, id: decoded.id,login: decoded.login });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

 const logout = async(req,res)=>{
  try {
    const {id} = req.body
    await userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { login: false }},
      { new: true }
    );
   res.status(200).json("Logout successfully")
  } catch (error) {
    res.status(500).json("Internal server error")
  }
 }


const updateProfile = async (req, res) => {
  try {

    const { id } = req.body;
    console.log(id);
    // if (!req?.files?.image)
    //   return res.status(400).json("Please upload an image");
    // const file = req.files.image;

    // const result = await cloudinary.uploader.upload(file.tempFilePath, {
    //   public_id: file.name,
    //   resource_type: "image",
    //   folder: "profile",
    // });
 //   if (result) {
      const data = await userModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            first_name: req.body.first,
            last_name: req.body.last,
             profile_url: "",
             asset_id: "",
            gender: req.body.gender,
            profile_complete: true,
            mobile_number: req.body.mobile
          },
        },
        { new: true }
      );
      res.status(200).json(data);
  //  }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  loginUser,
  verifyOtp,
  fetchUser,
  checkAuth,
  loginWithfirebaseOtp,
  updateProfile,
  logout
};
