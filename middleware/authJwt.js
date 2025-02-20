require("dotenv").config();
const jwt = require("jsonwebtoken")

const secretKey = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {

    //  console.log("Headers received:", req.headers);
    let token = req.header("Authorization");

    console.log(token);

    if (!token) return res.status(401).send({ message: "Access denied: No token provided" });

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trim();
        // token = token.slice(7, token.length).trim(); // Remove "Bearer " prefix
    }
    console.log("extracted token : - ", token);
    token = token.replace(/^"|"$/g, "");

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).send({ message: "Token is not valid, please log in again" });
        }

        console.log("🔹 Decoded User:", user);
        req.user = user;
        console.log("Decoded user:", user);

        next();
    });
}

module.exports = authenticateToken;