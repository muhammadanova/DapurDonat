var CryptoJS = require("crypto-js");
var sha256 = require("crypto-js/sha256");

class UserController{
    static loginPage(req,res){
      res.render('backend/login')
    }
    static doLogin(req,res){
        User.findOne({
            where:{
                email: req.body.email,
                password: req.body.password
            }
        })
            .then(user=>{
                if(user){
                    req.session.user = {
                        name: user.name,
                        email: user.email
                    }
                }else{
                    throw 'username/password is wrong'
                }
            })
            .catch(err=>{
                if(err == 'username/password is wrong'){
                    res.render('/login',{err})
                }else{
                    res.send(err)
                }
            })
    }
    static registerForm(req,res){
        res.render('/register')
    }
    static register(req,res){
        let data = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where:{
                email: req.body.email,
                password: req.body.password
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
                            console.log(`sukses registrase`)
                        }
                      })
                    let encriptedPassword = sha256("Message").toString(CryptoJS.enc.Base64);
                    data.password = encriptedPassword
                    return User.create(data)
                }
            })
            .then(result=>{
                console.log(result)
            })
            .catch(err=>{
                res.send(err)
            })
    }
}

module.exports = UserController