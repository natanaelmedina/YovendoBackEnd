
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('./config');

// create application/json parser
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user:config.gmailCred.user,
    pass:config.gmailCred.pass
  },
  tls: {
    rejectUnauthorized: false
  }
});


const handleRequestError = function (request, h, err) {
  console.log("err: ", err);
  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
    const errorMessages = err.details.map(e => e.message.replace(/\"/g, ""))
    return buildResponse(h, 400, false, errorMessages)
  }
  return h.response().takeover()
}

const buildResponse = (h, code = 200, success, message, data = null) => {
  return h
    .response({
      success,
      message,
      data
    })
    .code(code)
    .takeover()
}

const generateJWT = (payload) => {
  const algorithmToUse = 'HS256';

  const options = {
    algorithm: algorithmToUse,
  }
  return jwt.sign(payload, process.env.JWT, options);
}

const sendEmail = (d) => {
  var mailOptions = {
    from: config,
    to: d.to,
    subject: d.subject,
    text: d.text,
    html: d.html,
    files: d.files,
    attachments: d.attachments
  };
  // sending...
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('ERROR!!!  -->' + error);
    } else {
      console.log(d.to + '----> MAIL SENT!');
    }
  })
}

module.exports = {
  handleRequestError,
  buildResponse,
  generateJWT,
  sendEmail
}