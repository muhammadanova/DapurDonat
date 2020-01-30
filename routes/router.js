const express = require('express')
const router = express.Router()
const multer = require('multer')
const UserController = require('../controllers/UserController')
const PanelController = require('../controllers/PanelController')
const GeneralController = require('../controllers/GeneralController')
const isLogin = require('../middlewares/isLogin')
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

router.get('/', GeneralController.home)
router.get('/menus', GeneralController.menus)
router.get('/contact', GeneralController.contact)
router.get('/admin/login', UserController.loginPage)
router.post('/admin/login', UserController.doLogin)

router.get('/admin/dashboard', PanelController.dashboard)
router.get('/admin/user', PanelController.userList)
router.get('/admin/product', PanelController.productList)
router.post('/admin/product', PanelController.addProduct)

router.get('/admin/product/edit/:id', PanelController.editProductForm)
router.post('/admin/product/edit/:id', PanelController.editProduct)

router.get('/admin/product/delete/:id', PanelController.deleteProduct)

module.exports = router