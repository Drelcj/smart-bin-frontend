const express = require('express');
const router = express.Router();
const Article = require('../models/Articles'); 
const jwt = require('jsonwebtoken'); 

// Replace with your secret key for JWT
const secretKey = 'your_secret_key';

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find(); // Fetch all articles
    res.status(200).json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Create an article (Admin only)
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  // Authorization/Authentication Logic (using JWT)
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);

    // Placeholder logic to check if the user role is admin based on decoded data
    if (decoded.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden (Not Admin)' });
    }

  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ success: false, message: 'Invalid Token' });
  }

  try {
    const newArticle = new Article({ title, content });
    const savedArticle = await newArticle.save();
    res.status(201).json({ success: true, article: savedArticle });
  } catch (error) {
    console.error('Error creating article:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;