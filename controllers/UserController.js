const bcrypt = require('bcrypt');
const transporter = require('../helpers/configMail')
const { User } = require('../models')

class UserController{
    static loginPage(req,res){
      res.render('backend/login')
    }
    static doLogin(req,res){
      User.findOne({
          where:{
            email: req.body.email
          }
        })
        .then(cekpass => {
          if(bcrypt.compareSync(req.body.password, cekpass.password)){
            return cekpass
          }else{
            throw 'username/password is wrong'
          }
        })
        .then(user => {
          if(user){
            if(user.isactive === 1){
              req.session.user = {
                name: user.username,
                email: user.email,
                role: user.role
              }
              req.app.locals.user = req.session.user
              res.redirect('/admin/dashboard')  
            }else{
              throw `please confirm your registration in your mailbox that we sent to ${user.email}`
            }
          }else{
            throw 'username/password is wrong'
          }
        })
        .catch(err=>{
          if(err == 'username/password is wrong'){
            res.render('backend/login', { err })
          }else{
            res.render('backend/login')
          }
        })
    }

    static doLogout(req, res){
      req.session.destroy(err => {
        req.app.locals.user = null
        res.redirect('/admin/login')
      })
    }

    static doLoginMember(req, res){
      User.findOne({
        where: {
          email : req.body.email
        }
      })
      .then(cekpass => {
        if(bcrypt.compareSync(req.body.password, cekpass.password)){
          return cekpass
        }else{
          throw 'username/password is wrong'
        }
      })
      .then(user => {
        if(user){
          if(user.isactive === 1){
            req.session.user = {
              name: user.username,
              email: user.email,
              role: user.role
            }
            req.app.locals.user = req.session.user
            res.redirect('/')  
          }else{
            throw `please confirm your registration in your mailbox that we sent to ${user.email}`
          }
        }else{
          throw 'username/password is wrong'
        }
      })
      .catch(err=>{
        if(err == 'username/password is wrong'){
          res.render('frontend/index')
        }else{
          res.render('frontend/index')
        }
      })
    }

    static doLogoutMember(req, res){
      req.session.destroy(err => {
        req.app.locals.user = null
        res.redirect('/')
      })
    }

    static doRegister(req,res){
      let data = {
        username:req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: 'member',
        isactive: 0
      }
      User.findOne({
        where:{
          email: req.body.email
        }
      })
      .then(user=>{
        if(!user){
          let HelperOption = {
            from: "Dapur Donat <dapurdonut@gmail.com",
            to: `${req.body.email}`,
            subject: 'Registrasi Dapur Donat',
            html: `<p>anda berhasil registrasi dengan email ${req.body.email}. klik link untuk konfirmasi <a href="https://rocky-citadel-20499.herokuapp.com/confirmRegistration/${req.body.email}">disini</a></p>`
          }
          transporter.sendMail(HelperOption, (err, info) => {
            if(err){
              console.log(`gagal registrasi`)
              throw `gagal registrasi`
            }else{
              let encriptedPassword = sha256("Message").toString(CryptoJS.enc.Base64);
              data.password = encriptedPassword
              console.log(`sukses registrasi`)
              return User.create(data)
            }
          })
        }else{
          throw (`email ${req.body.email} sudah terdaftar`)
        }
      })
      .then(result=>{
        res.redirect('/notifikasiRegistrasi')
      })
      .catch(err=>{
        res.send(err)
      })
    }
    static recoveryPasswordPage(req,res){
      res.render('backend/pass')
    }

    static recoveryPassword(req,res){
      let HelperOption = {
        from: "Dapur Donat <dapurdonut@gmail.com",
        to: `${req.body.email}`,
        subject: 'Password Recovery Dapur Donat',
        html: `<p>untuk recovery password anda, silahkan klik link <a href=''>reset password</a></p>`
      }
      transporter.sendMail(HelperOption, (err, info) => {
        if(err){
          console.log(`gagal kirim email recovery password`)
        }else{
          console.log(`sukses kirim email recovery password`)
        }
      })
      // res.render('pass')
    }
}

module.exports = UserController