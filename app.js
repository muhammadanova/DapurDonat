const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const router = require('./routes/router')

app.use(express.static('public'))
app.use(express.static(__dirname))
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
app.locals.convertIDR = require('./helpers/convertIDR')
app.locals.user = null

app.use(router)

app.listen(port, () => {
  console.log(`Running port is ${port}`)
})
