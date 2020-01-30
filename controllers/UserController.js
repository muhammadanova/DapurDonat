const bcrypt = require('bcrypt');
const saltRounds = 11;
const transporter = require('../helpers/configMail')
const {User} = require('../models')

class UserController{
    static home(req,res){
      res.render('/')
    }
    static loginPage(req,res){
        res.render('backend/index')
    }
    static doLogin(req,res){
        User.findOne({
            where:{
                email: req.body.email
            }
        })
            .then(cekpass=>{
                if(bcrypt.compareSync(req.body.password, cekpass.password)){
                    return cekpass
                }else{
                    throw 'username/password is wrong'
                }
            })
            .then(user=>{
                if(user){
                    if(user.isactive == 1){
                        req.session.user = {
                            name: user.name,
                            email: user.email
                        }
                    }else{
                        throw `please confirm your registration in your mailbox that we sent to ${user.email}`
                    }
                    // res.redirect('/dashboard')
                }else{
                    throw 'username/password is wrong'
                }
            })
            .catch(err=>{
                if(err == 'username/password is wrong'){
                    res.render('backend/index', {err})
                }else{
                    res.send(err)
                }
            })
    }
    static registerPage(req,res){
        res.render('backend/regis')
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
                        html: `<p>anda berhasil registrasi dengan email ${req.body.email} dan password ${req.body.password}</p>`
                      }
                      transporter.sendMail(HelperOption, (err, info) => {
                        if(err){
                            console.log(`gagal registrasi`)
                            throw `gagal registrasi`
                        }else{
                            console.log(`sukses registrasi`)
                        }
                      })
                    let encriptedPassword = sha256("Message").toString(CryptoJS.enc.Base64);
                    data.password = encriptedPassword
                    // return User.create(data)
                }else{
                    throw (`email ${req.body.email} sudah terdaftar`)
                }
            })
            .then(result=>{
                let info = `link konfirmasi telah kami kirimkan ke email ${req.body.email}.`
                res.render('backend/regis',{result})
                console.log(result)
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