import Post from "../models/Post.js";

/* CREATE POST */
export const createPost = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const post = new Post(data);
    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

/* GET ALL POSTS */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE POST */
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE POST */
import fs from "fs";
import path from "path";

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // delete uploaded image if exists
    if (post.image) {
      const imagePath = path.join(".", post.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
