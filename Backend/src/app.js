const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.model");

// ================= MIDDLEWARE =================

app.use(express.json());

app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
});


// ================= CREATE POST =================

app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    console.log("CREATE POST REQUEST");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });

  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    return res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
});


// ================= GET ALL POSTS =================

app.get("/posts", async (req, res) => {
  try {
    console.log("GET /posts HIT 🔥");

    const posts = await postModel.find();

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });

  } catch (error) {
    console.error("GET POSTS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
});


// ================= DELETE SPECIFIC POST =================

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE REQUEST RECEIVED:", id);

    const deletedPost = await postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      console.log("POST NOT FOUND:", id);

      return res.status(404).json({
        message: "Post not found",
      });
    }

    console.log("POST DELETED:", deletedPost._id);

    return res.status(200).json({
      message: "Post deleted successfully",
      post: deletedPost,
    });

  } catch (error) {
    console.error("DELETE POST ERROR:", error);

    return res.status(500).json({
      message: "Failed to delete post",
      error: error.message,
    });
  }
});


// ================= EXPORT =================

module.exports = app;