const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { login, getUserInfo } = require('../controllers/userController')

// 登录接口
router.post('/login', login)

router.get('/info', auth, getUserInfo)

module.exports = router