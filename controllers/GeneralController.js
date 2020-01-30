const { User, Product, Order } = require('../models')

class GeneralController {
  static home(req, res){
    console.log(req.session)
    res.render('frontend/index')
  }
  
  static menus(req, res){
    res.render('frontend/menus/menulist')
  }

  static listCart(req, res){
    res.render('frontend/carts/listcart')
  }

  static contact(req, res){
    res.render('frontend/contacts/contactlist')
  }

  static resetPassFormBefore(req, res){
    res.render('frontend/resetpass/resetform')
  }

  static confirmRegistration(req, res){
    res.send('test')
  }

  static resetPassPage(req, res){
    res.render('frontend/resetpass/resetpass')
  }

  static resetPass(req, res){
    res.send('test')
  }
}

module.exports = GeneralController