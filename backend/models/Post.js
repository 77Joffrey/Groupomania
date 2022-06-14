const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    posterId: { type: String, required: true },
    message: { type: String, trim: true, maxlength: 400 },
    picture: { type: String },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: [String],
    usersDisliked: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
