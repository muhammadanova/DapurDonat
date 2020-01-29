const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  logger: true,
  debug: true,
  auth: {
    user: 'dapurdonut@gmail.com',
    pass: 'Dapurdonut2020'
  }
  // , tls: {
  //   rejectUnauthorized: false
  // }
});

module.exports = transporter