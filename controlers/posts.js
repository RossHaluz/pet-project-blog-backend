const PostModel = require("../models/Post.js");

const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find();

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Can't get posts(",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const { postId } = req.params;
    const getPost = await PostModel.findById(postId);
    if (!getPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.json(getPost);
  } catch (error) {
    res.status(404).json({
      message: "Post not found",
    });
  }
};

const add = async (req, res) => {
  try {
    const owner = req.userId;
    const newPost = await PostModel.create({ ...req.body, owner });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({
      message: "Bed request",
    });
  }
};

const removePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Can not delete a post",
    });
  }
};

const update = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({
        message: "Can not find a post",
      });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Can not update the post",
    });
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  removePost,
};
