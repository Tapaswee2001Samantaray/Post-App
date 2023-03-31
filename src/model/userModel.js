const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
    },
    dob: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        lowercase: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model("userData", userSchema);