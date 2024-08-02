const articleModel = require("../models/Articles");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/User");

const getArticles = asyncHandler(async (req, res) => {
  try {
    const articles = await articleModel.find(); // Fetch all articles
    res.status(200).json({ success: true, articles });
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

const createArticle = asyncHandler(async (req, res) => {
  try {
    const id = req.admin._id;
    if (!id) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const admin = await userModel.findById(id);
    if (!admin) {
      res.status(404);
      throw new Error("Admin does not exist");
    }
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400);
      throw new Error("Title and content are required");
    }
    const newArticle = await userModel.create({ title, content });
    res.status(201).json({ success: true, article: newArticle });
  } catch (error) {
    console.error("Error creating article:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = { getArticles, createArticle };
