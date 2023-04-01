const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controller/userController")
const { postPost, updatePost, deletePost } = require("../controller/postController")
const { postComment, updateComment, deleteComment, replyComment, getComments } = require("../controller/commentController");
const { isAuthenticated } = require("../middleware/commonMiddleware")

//================== USER ========================//

router.post("/register", createUser);
router.post("/login", loginUser);

//=================== POST =======================//

router.post("/post", isAuthenticated, postPost);
router.put("/post/:postId", isAuthenticated, updatePost);
router.delete("/post/:postId", isAuthenticated, deletePost);

//==================== COMMENT ===================//

router.post("/comment/:postId", isAuthenticated, postComment);
router.put("/comment/:commentId", isAuthenticated, updateComment);
router.delete("/comment/:commentId", isAuthenticated, deleteComment);
router.put("/comment/reply/:commentId", isAuthenticated, replyComment);
router.get("/comment/:postId", isAuthenticated, getComments);


router.all("/*", (req, res) => {

    res.status(400).send({ status: false, message: "INVALID PATH" })
})

module.exports = router;