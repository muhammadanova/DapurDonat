const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')

const isLogin = require('../middlewares/isLogin')
const adminOnly = require('../middlewares/adminOnly')

router.get('/admin/login', UserController.loginPage)
router.post('/admin/login', UserController.doLogin)

module.exports = router