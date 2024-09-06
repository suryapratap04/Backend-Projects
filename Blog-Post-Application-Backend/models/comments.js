const mongoose = require("mongoose");
const commentsSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  userName: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
    maxLength: 50,
  },
});
module.exports = mongoose.model("Comment", commentsSchema);
