// import the models
const Comment = require("../models/comments");
const Post = require("../models/posts");

// Business Logic
exports.createComment = async (request, response) => {
  try {
    // Fetch the data from request body
    const { post, userName, body } = request.body;
    // create a comment object
    const comment = new Comment({
      post,
      userName,
      body,
    });

    // save the new comment to database
    const saveComment = await comment.save();

    // find the post id and update the post comment array
    // push for update and entry
    // pull for delete
    // new Will return Updated Post
    // populates  will return the array with comment documents not id for particular comment
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { comments: saveComment._id },
      },
      { new: true }
    )
      .populate("comments")
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
