const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET || "test-secret-key";

async function registerUser(req, res) {

    let { firstName, lastName, userName, password } = req.body;

    try {
        const duplicate = await User.find({ userName });
        if (duplicate && duplicate.length > 0) {
            return res.status(400).send({ message: 'User already Registered with this UserNmae' });
        }
        let user = new User({ firstName, lastName, userName, password });
        const result = await user.save();
        console.log(result);
        res.status(201).send({ message: 'User Registered Successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function loginUser(req, res) {

    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).send({ message: "wrong password or UserName" });
        }

        let token = jwt.sign({ userId: user?._id }, secretKey, { expiresIn: '1h' });

        let finalData = {
            userId: user?._id,
            userName: user?.userName,
            firstName: user?.firstName,
            lastName: user?.lastName,
            token
        }
        res.send(finalData);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function deleteAccount(req, res) {

    try {
        const userId = req.user.userId; // Ensure this matches the token payload
        console.log("User ID for delete:", userId);

        if (!userId) {
            return res.status(400).json({ message: "Invalid token or user ID missing" });
        }

        const user = await User.findByIdAndDelete(userId);
        console.log("User deleted:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Account deleted successfully" });

    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

const AuthController = {
    registerUser,
    loginUser,
    deleteAccount
}

module.exports = AuthController;