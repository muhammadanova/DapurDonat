const express = require('express')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',//smtp.gmail.com  //in place of service use host...
  logger: true,//true
  debug: true,//465
  auth: {
    user: 'dapurdonut@gmail.com',
    pass: 'Dapurdonut2020'
  }
  // , tls: {
  //   rejectUnauthorized: false
  // }
});

