
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('./config');
const path = require('path');
const Emitter = require('events').EventEmitter;
Emitter.defaultMaxListeners = 9E6

// create application/json parser
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: config.gmailCred.user,
    pass: config.gmailCred.pass
  },
  tls: {
    rejectUnauthorized: false
  }
});


const handleRequestError = function (request, h, err) {
  console.log("err: ", err);
  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
    const errorMessages = err.details.map(e => e.message.replace(/\"/g, ""))
    return buildResponse(h, 200, false, errorMessages)
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

const tokenVerify = (token) => {
  return jwt.verify(token, process.env.JWT)
}

const sendEmail = (d) => {
  return new Promise((resolve, reject) => {
    const attachments = [
      {
        filename: "logo.png",
        path: path.join(__dirname, "./public/logo.png"),
        cid: "logo",
      },
      {
        filename: "header.png",
        path: path.join(__dirname, "./public/header.png"),
        cid: "header",
      },
    ]
    const mailOptions = {
      from: `"YoVendoRD" <${config.gmailCred.user}>`,
      to: d.to,
      subject: d.subject,
      text: d.text,
      html: d.html,
      files: d.files,
      attachments: d.attachments === true ? attachments : d.attachments
    };
    // sending...
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(new Error("Error interno intente mas tarde"));
      } else {
        resolve(d.to + '----> MAIL SENT!');
      }
    })
  })

}

class ServerEvent extends Emitter {
  constructor(props) {
    super(props)
  }
  /**
   * 
   * @param {Object} data dotos a enviar a los clientes contectos
   * @param {String} data[].type //event type
   * @param {Object} data[].payload // carga util
   * @param {String} data[].to // a quien enviá el mensaje, elige all  para enviar a todos
   */
  send(data) {
    if (typeof data !== "object")
      throw new Error("data debe ser tipo object")
    this.emit("message", data)
  }
}
const serverEvent = new ServerEvent()

module.exports = {
  handleRequestError,
  buildResponse,
  generateJWT,
  sendEmail,
  serverEvent,
  tokenVerify
}