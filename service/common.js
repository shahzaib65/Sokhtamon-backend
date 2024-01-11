const passport = require('passport');
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

  exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt');
  };
  
  exports.sanitizeUser = (user) => {
    return { id: user.id, role: user.role };
  };
  
  exports.cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  };

  exports.sendMail = async function ({to, subject, text, html}){
    let info = await transporter.sendMail({
        from: '"Сохта-Мон" <sokhtamon@gmail.com>', // sender address
        to,
        subject,
        text,
        html
      });
    return info;  
}