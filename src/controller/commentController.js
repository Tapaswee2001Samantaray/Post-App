const commentModel = require("../model/commentModel")
const postModel = require("../model/postModel")


const postComment = async (req, res) => {
    try {
        let postId = req.body.postId;
        let comment = req.body.comment;
        if (!postId) return res.status(400).send({ status: false, message: "please provide postId" })
        if (!comment) return res.status(400).send({ status: false, message: "please provide comment" })
        let userId = req.token.userId;
        let postData = await postModel.findOne({ _id: postId, isDeleted: false });
        if (!postData) return res.status(404).send({ status: false, message: "no such post found" });
        let commentData = await commentModel.create({ postId: postId, userId: userId, comment: comment });
        return res.status(201).send({ status: true, message: "commented successfully", data: commentData });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


const updateComment = async (req, res) => {
    try {
        let commentId = req.params.commentId;

        let comment = req.body.comment;

        if (!commentId) return res.status(400).send({ status: false, message: "please provide commentId" })

        if (!comment) return res.status(400).send({ status: false, message: "please provide comment" })

        let userId = req.token.userId;

        let commentData = await commentModel.findOne({ _id: commentId, isDeleted: false });

        if (!commentData) return res.status(404).send({ status: false, message: "comment not found" });

        if (commentData.userId != userId) return res.status(403).send({ status: false, message: "you can't update this comment" });

        let updateCommentData = await commentModel.findOneAndUpdate({ _id: commentId }, { comment: comment }, { new: true });

        return res.status(200).send({ status: true, message: "comment updated successfully", data: updateCommentData });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


const deleteComment = async (req, res) => {
    try {
        let commentId = req.params.commentId;

        if (!commentId) return res.status(400).send({ status: false, message: "please provide commentId" })

        let userId = req.token.userId;

        let commentData = await commentModel.findOne({ _id: commentId, isDeleted: false });

        if (!commentData) return res.status(404).send({ status: false, message: "comment not found" })

        if (commentData.userId != userId) return res.status(403).send({ status: false, message: "you can't delete this comment" })

        await commentModel.findOneAndUpdate({ _id: commentId }, { isDeleted: true });

        return res.status(200).send({ status: true, message: "comment deleted successfully" });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


const replyComment = async (req, res) => {
    try {
        let commentId = req.params.commentId;

        let replies = req.body.reply;

        if (!commentId) return res.status(400).send({ status: false, message: "please provide commentId" })

        let userId = req.token.userId;

        let commentData = await commentModel.findOne({ _id: commentId, isDeleted: false });

        if (!commentData) return res.status(404).send({ status: false, message: "comment not found" });

        let postId = commentData.postId;

        //extract user id from comment model
        let postData = await postModel.findOne({ _id: postId, isDeleted: false });

        let userOfPost = postData.userId;

        if (userOfPost != userId) return res.status(403).send({ status: false, message: "You can't reply on the comment" })

        //isReply=true need to be done
        let replyData = await commentModel.findOneAndUpdate({ _id: commentId }, { $push: { replies: replies } }, { new: true });

        return res.status(200).send({ status: true, message: "successfully replied", data: replyData });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}



module.exports = { postComment, updateComment, deleteComment, replyComment };