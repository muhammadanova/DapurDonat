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
    res.send('test')
  }
}

module.exports = GeneralController