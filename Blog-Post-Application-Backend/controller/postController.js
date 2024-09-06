const Post = require("../models/posts");

exports.createPost = async (request, response) => {
  try {
    const { title, body } = request.body;
    const post = new Post({
      title,
      body,
    });
    const savedPost = await post.save();
    response.json({
      post: savedPost,
    });
  } catch (err) {
    console.error(err),
      console.log(err),
      response.status(500).json({
        sucess: false,
        data: "Internal Server error",
        message: err.message,
      });
  }
};

exports.getAllPost = async (request, response) => {
  try {
    const posts = await Post.find()
      .populate("comments")
      .populate("likes")
      .exec();
    response.json({
      posts,
    });
  } catch (err) {
    console.error(err),
      console.log(err),
      response.status(500).json({
        sucess: false,
        data: "Internal Server error",
        message: err.message,
      });
  }
};
