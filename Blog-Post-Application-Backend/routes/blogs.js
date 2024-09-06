const express = require("express");
const Router = express.Router();

// import the conttroller
const { createComment } = require("../controller/commentController");
// const { getLike } = require("../controller/likecontroller");
const { postLike, postUnLike } = require("../controller/likeController");
const { createPost, getAllPost } = require("../controller/postController");

// mapping the controller
Router.post("/comments/create", createComment);
Router.post("/posts/create", createPost);
Router.get("/posts", getAllPost);
Router.post("/likes/like", postLike);
Router.post("/likes/unlike", postUnLike);

module.exports = Router;
