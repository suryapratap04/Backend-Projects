const Like = require("../models/likes");
const Post = require("../models/posts");

// Business Logic
exports.postLike = async (request, response) => {
  try {
    // Fetch the data from request body
    const { post, userName } = request.body;
    // create a comment object
    const like = new Like({
      post,
      userName,
    });

    // save the new comment to database
    const saveLike = await like.save();

    // find the post id and update the post comment array
    // push for update and entry
    // pull for delete
    // new Will return Updated Post
    // populate  will return the array with comment documents not id for particular comment
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { likes: saveLike._id },
      },
      { new: true }
    )
      .populate("likes")
      .exec();
    response.json({
      post: updatedPost,
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
exports.postUnLike = async (request, response) => {
  try {
    // Fetch the data from request body
    const { post, like } = request.body;

    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });
    const updatePostLikes = await Post.findByIdAndUpdate(
      post,
      {
        $pull: { likes: deletedLike._id },
      },
      { new: true }
    );
    response.json({
      post: updatePostLikes,
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
