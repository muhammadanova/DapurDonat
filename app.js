// let HelperOption = {
//   from: "Dapur Donat <dapurdonut@gmail.com",
//   to: 'kevintan203@gmail.com',
//   subject: 'Registrasi Dapur Donat',
//   html: 'MASUUUUUK WOIIII <a href="/confirm">CONFIRM REGIST</a>'
// }

// transporter.sendMail(HelperOption, (err, info) => {
//   if(err){
//     console.log(err)
//   }else{
//     console.log('ke kirim coy!')
//     console.log(info)
//   }
// })

const express = require('express')
const app = express()
const port = 3000
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const router = require('./routes/router')

app.use(express.static('public'))
app.use(express.urlencoded({ extended : true }))
app.use(flash())
app.use(cookieParser('secret'))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.set('view engine', 'ejs')
app.locals.moment = require('moment')
app.locals.user = {}

app.use(router)

app.listen(port, () => {
  console.log(`Running port is ${port}`)
})
