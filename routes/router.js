const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const PanelController = require('../controllers/PanelController')
const ProductController = require('../controllers/ProductController')

const isLogin = require('../middlewares/isLogin')
const adminOnly = require('../middlewares/adminOnly')


// router.get('/',UserController.home)
router.get('/login', UserController.loginPage)
router.post('/login', UserController.doLogin)

// router.get('/admin/login', UserController.loginPage)
// router.post('/admin/login', UserController.doLogin)

router.get('/user/registration', UserController.registerPage)
router.post('/user/registration', UserController.doRegister)
router.get('/user/passwordRecovery', UserController.recoveryPasswordPage)
router.post('/user/passwordRecovery', UserController.recoveryPassword)
// router.get('/user/login', UserController.registerPage)
// router.post('/user/registration', UserController.doRegister)

// router.get('/admin/dashboard', isLogin, adminOnly, PanelController.dashboard)
// router.get('/admin/product', isLogin, adminOnly, PanelController.productList)

module.exports = router