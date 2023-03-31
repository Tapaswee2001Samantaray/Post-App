const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        trim: true
    },
    post: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: objectId,
        ref: "userData",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("postData", postSchema);