const express = require("express");
const router = express.Router();
const postController = require("../controllers/post_controller");
const {userAuth} = require('../middlewares/user_auth')

router.get("/", userAuth, postController.getPosts);
router.get("/:id", userAuth, postController.getOnePost);
router.post("/", userAuth, postController.createPost);
router.put("/:id", userAuth, postController.updatePost);
router.delete("/:id", userAuth, postController.deletePost);
router.patch("/:id/likes", userAuth, postController.likePost)


module.exports = router;
