const { User, Product, Order, Cart } = require('../models')
var id_transaksi = 0
const transporter = require('../helpers/configMail')
const convertIDR = require('../helpers/convertIDR')

class GeneralController {
  static home(req, res){
    // console.log(req.session)
    res.render('frontend/index')
  }
  
  static menus(req, res){
    Product.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10
    })
    .then(products => {
      res.render('frontend/menus/menulist', { products })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static addItem(req, res){
    const id_product = Number(req.params.id)
    const id_user = Number(req.session.user.id)
    const price = Number(req.params.price)
    const dataBeli = {
      ProductId: id_product,
      UserId: id_user,
      total_price: price,
      quantity: 1
    }
    if(req.session.user){
      Cart.create(dataBeli)
        .then(result => {
          res.redirect('/cart')
        })
        .catch(err => {
          res.send(err)
        })
    }else{
      res.redirect('/')
    }
  }

  static listCart(req, res){
    if(req.session.user){
      User.findOne({
        where: {
          id : req.session.user.id
        },
        include: {
          model : Cart,
          include: {
            model : Product
          }
        }
      })
      .then(userCart => {
        if(userCart.Carts.length !== 0){
          let totalPrice = 0
          userCart.Carts.map(el => {
            totalPrice += el.Product.price * el.quantity
          })
          let converterIDR = convertIDR(totalPrice)
          res.render('frontend/carts/listcart', { userCart, totalPrice : converterIDR })
        }else{
          res.redirect('/')
        }
      })
      .catch(err => {
        res.send(err)
      })
    }else{
      res.redirect('/')
    }
  }

  static minusQuantity(req, res){
    const id_cart = Number(req.params.id)
    Cart.findByPk(id_cart)
      .then(cart => {
        if(cart.quantity > 1){
          let obj = {
            quantity : cart.quantity -= 1
          }
          return Cart.update(obj, {
            where: {
              id: cart.id
            }
          })
        }else{
          res.redirect('/cart')
        }
      })
      .then(result => {
        res.redirect('/cart')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static plusQuantity(req, res){
    const id_cart = Number(req.params.id)
    Cart.findByPk(id_cart)
      .then(cart => {
        if(cart.quantity > 0){
          let obj = {
            quantity : cart.quantity += 1
          }
          return Cart.update(obj, {
            where: {
              id: cart.id
            }
          })
        }else{
          res.redirect('/cart')
        }
      })
      .then(result => {
        res.redirect('/cart')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static deleteCart(req, res){
    const id_cart = Number(req.params.id)
    Cart.destroy({
      where : { id : id_cart }
    })
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static orderDonat(req, res){
    if(req.session.user){
      User.findOne({
        where: {
          id : req.session.user.id
        },
        include: {
          model : Cart,
          include: {
            model : Product
          }
        }
      })
      .then(userCart => {
        let dataOrder = {
          username : req.session.user.name,
          email: req.session.user.email,
          products_name: '',
          quantities: 0,
          total_price: 0,
          address: req.body.address
        }
        let items = []
        userCart.Carts.map(el => {
          items.push(el.Product.name)
          dataOrder.quantities += el.quantity
          dataOrder.total_price += el.Product.price * el.quantity
        })
        dataOrder.products_name = items.join(', ')
        return Order.create(dataOrder)
      })
      .then(order => {
        id_transaksi = order.id
        return Cart.destroy({
          where: {},
          truncate: true
        })
      })
      .then(result => {
        res.redirect('/payment')
      })
      .catch(err => {
        res.send(err)
      })
    }else{
      res.redirect('/')
    }
  }

  static payment(req, res){
    Order.findOne({
      where: {
        id: id_transaksi
      }
    })
    .then(order => {
      console.log(order)
      res.render('frontend/orders/orderlast', { order })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static contact(req, res){
    res.render('frontend/contacts/contactlist')
  }

  static resetPassFormBefore(req, res){
    res.render('frontend/resetpass/resetform')
  }

  static resetPassBefore(req, res){
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
              console.log(`sukses kirim link reset password`)
              res.render('frontend/notifikasi/notifikasi',{message : 'silahkan cek email anda untuk reset password'})
            }
          })
        }else{
          throw "email tidak terdaftar"
        }
      })
    }

  static confirmRegistration(req, res){
    let dataUpdate = {
      isactive: 1 
    }
    User.update(dataUpdate, 
      {
        where:{
          email: req.params.email
        }
      })
      .then(result=>{
        res.redirect('/')
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
          email: req.params.email
        },
        individualHooks: true
      })
      .then(result=>{
        res.redirect('/')
      })
      .catch(err=>{
        res.send(err)
      })
  }
}

module.exports = GeneralController