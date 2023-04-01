const jwt = require("jsonwebtoken");

const isAuthenticated = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key'];

        if (!token) {
            return res.status(400).send({ status: false, message: "Token must be Present." });
        }

        jwt.verify(token, "postApp", function (err, decodedToken) {
            if (err) {

                if (err.name === 'JsonWebTokenError') {
                    return res.status(401).send({ status: false, message: "invalid token" });
                }

                if (err.name === 'TokenExpiredError') {
                    return res.status(401).send({ status: false, message: "you are logged out, login again" });
                } else {
                    return res.send({ msg: err.message });
                }
            } else {
                req.token = decodedToken;
                next();
            }
        });

    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message })
    }
}

module.exports.isAuthenticated = isAuthenticated;