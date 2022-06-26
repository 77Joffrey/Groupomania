const express = require("express");
const router = express.Router();
const postController = require("../controllers/post_controller");

router.get("/", postController.getPosts);
router.get("/:id", postController.getOnePost);
router.post("/",  postController.createPost);
router.put("/:id",  postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/:id/likes", postController.likePost);


module.exports = router;
