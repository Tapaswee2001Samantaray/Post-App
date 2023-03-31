const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: objectId,
        ref: "userData",
        required: true
    },
    postId: {
        type: objectId,
        ref: "postData",
        required: true
    },
    isReply: {
        type: Boolean,
        default: false
    },
    replies: {
        type: [String]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("commentData", commentSchema);