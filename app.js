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

let HelperOption = {
  from: "Kevin Tan <dapurdonut@gmail.com",
  to: ['kevintan203@gmail.com', 'anovanurfaqih@gmail.com'],
  subject: 'Registrasi Dapur Donat',
  html: 'MASUUUUUK WOIIII <a href="/confirm">CONFIRM REGIST</a>'
}

transporter.sendMail(HelperOption, (err, info) => {
  if(err){
    console.log(err)
  }else{
    console.log('ke kirim coy!')
    console.log(info)
  }
})