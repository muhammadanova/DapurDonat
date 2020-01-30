const express = require('express')
const router = express.Router()
const multer = require('multer')
const UserController = require('../controllers/UserController')
const PanelController = require('../controllers/PanelController')
const GeneralController = require('../controllers/GeneralController')
const isLoginAdmin = require('../middlewares/isLoginAdmin')
const adminOnly = require('../middlewares/adminOnly')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

let upload = multer({ storage: storage }).single('images_product')

router.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
  })
})



// BACK END CMS //
// USER UNTUK ADMIN
router.get('/admin/login', UserController.loginPage)
router.post('/admin/login', UserController.doLogin)
router.get('/admin/logout', isLoginAdmin, adminOnly, UserController.doLogout)

// USER UNTUK MEMBER
router.post('/user/login', UserController.doLoginMember)

// PANEL CONTROLLER
router.get('/admin/dashboard', isLoginAdmin, adminOnly, PanelController.dashboard)
router.get('/admin/user', isLoginAdmin, adminOnly, PanelController.userList)
router.get('/admin/product', isLoginAdmin, adminOnly, PanelController.productList)
router.post('/admin/product', isLoginAdmin, adminOnly, PanelController.addProduct)
router.get('/admin/product/edit/:id', isLoginAdmin, adminOnly, PanelController.editProductForm)
router.post('/admin/product/edit/:id', isLoginAdmin, adminOnly, PanelController.editProduct)
router.get('/admin/product/delete/:id', isLoginAdmin, adminOnly, PanelController.deleteProduct)

// FRONT END //
// GENERAL CONTROLLER
router.get('/', GeneralController.home)
router.get('/menus', GeneralController.menus)
router.get('/contact', GeneralController.contact)
router.get('/resetPassword/:email', GeneralController.resetPassPage)
router.post('/resetPassword/:email', GeneralController.resetPass)
router.get('/confirmRegistration', GeneralController.confirmRegistration)

module.exports = router