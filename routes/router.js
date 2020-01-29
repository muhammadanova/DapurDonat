const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const PanelController = require('../controllers/PanelController')
const ProductController = require('../controllers/ProductController')

const isLogin = require('../middlewares/isLogin')
const adminOnly = require('../middlewares/adminOnly')

router.get('/admin/login', UserController.loginPage)
router.post('/admin/login', UserController.doLogin)

// router.get('/admin/dashboard', isLogin, adminOnly, PanelController.dashboard)
// router.get('/admin/product', isLogin, adminOnly, PanelController.productList)

module.exports = router