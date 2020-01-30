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
}

module.exports = GeneralController