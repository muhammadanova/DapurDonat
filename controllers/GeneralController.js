const { User, Product, Order } = require('../models')

class GeneralController {
  static home(req, res){
    res.render('frontend/index')
  }
  
  static menus(req, res){
    res.render('frontend/menus/menulist')
  }

  static contact(req, res){
    res.render('frontend/contacts/contactlist')
  }

  static resetPassFormBefore(req, res){
    res.render('frontend/resetpass/resetform')
  }

  static resetPassForm(req, res){
    User.findOne({
      where:{
        email: req.body.email
      }
    })
      .then(user=>{
        if(user){
          let HelperOption = {
            from: "Dapur Donat <dapurdonut@gmail.com",
            to: `${req.body.email}`,
            subject: 'Reset Password Dapur Donat',
            html: `<p>klik link untuk reset password <a href="https://rocky-citadel-20499.herokuapp.com/resetPassword/${req.body.email}">disini</a></p>`
          }
          transporter.sendMail(HelperOption, (err, info) => {
            if(err){
              console.log(`gagal kirim link reset password`)
              throw `gagal kirim link reset password`
            }else{
              let encriptedPassword = sha256("Message").toString(CryptoJS.enc.Base64);
              data.password = encriptedPassword
              console.log(`sukses kirim link reset password`)
            }
          })
        }else{
          throw "email tidak terdaftar"
        }
      })
    }

  static confirmRegistration(req, res){
    User.update(
      {
        isactive: 1
      },
      {
        where:{
          email: req.body.email
        }
      })
      .then(result=>{
        let HelperOption = {
          from: "Dapur Donat <dapurdonut@gmail.com",
          to: `${req.body.email}`,
          subject: 'Registrasi Dapur Donat',
          html: `<p>anda berhasil konfirmasi pendaftaran. silahkan login di <a href="https://rocky-citadel-20499.herokuapp.com">disini</a></p>`
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
      })
      .catch(err=>{
        res.send('email tidak terdaftar')
      })
  }

  static resetPassPage(req, res){
    res.render('frontend/resetpass/resetpass')
  }

  static resetPass(req, res){
    User.update(
      {
        password: req.body.password 
      },
      {
        where:{
          email: req.body.email
        }
      })
      .then(result=>{
        res.render('frontend/notifikasi/notifikasi',{message : 'silahkan cek email anda untuk reset password'})
      })
      .catch(err=>{
        res.send(err)
      })
  }
  static notifResetPass(req,res){
    
  }
  static notifRegistrasi(req,res){
    
  }
}

module.exports = GeneralController