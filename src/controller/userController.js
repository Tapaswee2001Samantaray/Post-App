const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        let { fName, lName, email, password, gender, dob, city } = req.body;
        if (!fName || !lName || !email || !password || !dob) return res.status(400).send({ status: false, message: "required field are mandatory" })
        let createdUser = await userModel.create(req.body);
        return res.status(201).send({ status: true, data: createdUser });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const loginUser = async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        const data = req.body;
        let { email, password } = data;
        if (Object.keys(data).length != 0) {

            if (email && typeof email != "string") {
                return res.status(400).send({ status: false, message: "email must be in string" });
            }
            if (!email || !email.trim()) {
                return res.status(400).send({ status: false, message: "Email is mandatory and can not be empty." });
            }

            email = email.toLowerCase().trim();
            if (!validateEmail(email)) {
                return res.status(400).send({ status: false, message: "Please enter a valid Email." });
            }

            if (password && typeof password != "string") {
                return res.status(400).send({ status: false, message: "password must be in string" });
            }
            if (!password || !password.trim()) {
                return res.status(400).send({ status: false, message: "Password is mandatory and can not be empty." });
            }

            const userData = await userModel.findOne({ email: email, password: password });
            if (!userData) {
                return res.status(404).send({ status: false, message: "No such user exist. Please Enter a valid Email and Passowrd." });
            }

            let token = jwt.sign({
                userId: userData._id.toString(),
                exp: Math.floor(Date.now() / 1000) + (120 * 60),
                iat: Math.floor(Date.now())
            }, 'postApp');

            res.setHeader("x-api-key", token);
            res.status(200).send({ status: true, message: "Successfully Login.", data: { "token": token } });
        } else {
            return res.status(400).send({ status: false, message: "Body can not be empty" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { createUser, loginUser };