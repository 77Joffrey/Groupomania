const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    posterId: { type: String, required: true },
    posterPseudo : { type : String},
    message: { type: String, trim: true, maxlength: 400 },
    picture: { type: String },
    usersLiked: [String],
    usersDisliked: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
