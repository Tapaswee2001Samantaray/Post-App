const commentModel = require("../model/commentModel");
const postModel = require("../model/postModel")

const postPost = async (req, res) => {
    try {
        let { caption, post } = req.body;
        if (!caption || !post) return res.status(400).send({ status: false, message: "caption and post is required" })
        let userId = req.token.userId;
        req.body.userId = userId;
        let postedData = await postModel.create(req.body);
        return res.status(201).send({ status: true, message: "posted successfully", data: postedData })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const updatePost = async (req, res) => {
    try {
        let { caption, post, postId } = req.body;
        if (!postId) return res.status(400).send({ status: false, message: "postId is required" });
        if (!caption && !post) return res.status(400).send({ status: false, message: "caption or post is required" })
        let userId = req.token.userId;
        let postData = await postModel.findOne({ _id: postId, isDeleted: false });
        if (!postData) return res.status(404).send({ status: false, message: "no such post exist" });
        if (userId != postData.userId) return res.status(403).send({ status: false, message: "This post is not related to you" });
        let obj = {};
        if (caption) obj.caption = caption;
        if (post) obj.post = post;

        let editedPost = await postModel.findOneAndUpdate({ _id: postId }, obj, { new: true });

        return res.status(200).send({ status: true, message: "post is updated successfully", data: editedPost })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const deletePost = async (req, res) => {
    try {
        let postId = req.params.postId;

        let userId = req.token.userId;
        let postData = await postModel.findOne({ _id: postId, isDeleted: false });
        if (!postData) return res.status(404).send({ status: false, message: "no post found to be deleted" });
        if (userId != postData.userId) return res.status(403).send({ status: false, message: "This post is not related to you" });

        await postModel.findOneAndUpdate({ _id: postId }, { isDeleted: true });

        await commentModel.updateMany({postId:postId},{isDeleted:true});

        return res.status(200).send({ status: true, message: "post is deleted successfully" });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { postPost, updatePost, deletePost };