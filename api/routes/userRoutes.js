const express = require('express')
const { registerUser, loginUser, updatePassword, getMe } = require('../services/UserService')
const validateToken = require('../middleware/validateToken')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/update-password', validateToken, updatePassword)
router.get('/me', validateToken, getMe)

module.exports = router