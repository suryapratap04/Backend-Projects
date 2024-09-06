const mongoose = require("mongoose");
const likesSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  userName: {
    type: String,
    reqiured: true,
  },
});
module.exports = mongoose.model("Like", likesSchema);
