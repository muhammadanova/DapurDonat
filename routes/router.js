const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const UserController = require('../controllers/UserController')
const PanelController = require('../controllers/PanelController')
const GeneralController = require('../controllers/GeneralController')
const isLoginAdmin = require('../middlewares/isLoginAdmin')
const adminOnly = require('../middlewares/adminOnly')

// BACK END CMS //
// USER UNTUK ADMIN
router.get('/admin/login', UserController.loginPage)
router.post('/admin/login', UserController.doLogin)
router.get('/admin/logout', isLoginAdmin, adminOnly, UserController.doLogout)

// USER UNTUK MEMBER
router.post('/user/login', UserController.doLoginMember)
router.get('/user/logout', UserController.doLogoutMember)
router.post('/user/registration', UserController.doRegister)

// PANEL CONTROLLER
router.get('/admin/dashboard', PanelController.dashboard)
router.get('/admin/user', PanelController.userList)
router.get('/admin/product', PanelController.productList)
router.post('/admin/product', upload.single('images_product'), PanelController.addProduct)
router.get('/admin/product/edit/:id', PanelController.editProductForm)
router.post('/admin/product/edit/:id', PanelController.editProduct)
router.get('/admin/product/delete/:id', PanelController.deleteProduct)

// FRONT END //
// GENERAL CONTROLLER
router.get('/', GeneralController.home)
router.get('/menus', GeneralController.menus)
router.get('/addItem/:id/:price', GeneralController.addItem)

// CART
router.get('/cart', GeneralController.listCart)
router.get('/minusQuantity/:id', GeneralController.minusQuantity)
router.get('/plusQuantity/:id', GeneralController.plusQuantity)
router.get('/delete/cart/:id', GeneralController.deleteCart)
router.post('/order', GeneralController.orderDonat)

router.get('/payment', GeneralController.payment)

router.get('/contact', GeneralController.contact)

// RESET PASSWORD
router.get('/resetPassword', GeneralController.resetPassFormBefore)
router.post('/resetPassword', GeneralController.resetPassBefore)

// RESET PASSWORD
router.get('/resetPassword/:email', GeneralController.resetPassPage)
router.post('/resetPassword/:email', GeneralController.resetPass)
router.get('/confirmRegistration/:email', GeneralController.confirmRegistration)

module.exports = router