const express = require('express')
const { getArticles, createArticle } = require('../services/ArticleService')
const validateToken = require('../middleware/validateToken')
const router = express.Router()

router.post('/', validateToken, getArticles)
router.get('/', validateToken, createArticle)

module.exports = router