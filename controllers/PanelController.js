const { User, Product, Order } = require('../models')

class PanelController {
  static dashboard(req, res){
    res.render('backend/dashboard')
  }

  static userList(req, res){
    User
      .findAll()
      .then(users => {
        console.log(users)
        res.render('backend/users/list', { users })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static productList(req, res){
    Product.findAll()
      .then(products => {
        res.render('backend/products/list', { products })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static addProduct(req, res){

  }

  static editProductForm(req, res){
    const id_product = Number(req.params.id)
    Product.findByPk(id_product)
      .then(product => {
        res.render('backend/products/edit', { product })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editProduct(req, res){
    const id_product = Number(req.params.id)
    let objData = {
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      img: req.body.img,
      desc: req.body.desc
    }

    Product.update(objData, {
        where : {
          id: id_product
        }
      })
      .then(result => {
        res.redirect('/admin/product')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static deleteProduct(req, res){
    const id_product = Number(req.params.id)
    Product.destroy({
        where : {
          id : id_product
        }
      })
      .then(result => {
        res.redirect('/admin/product')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = PanelController